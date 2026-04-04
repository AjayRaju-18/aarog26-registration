// Initialize registrations
let registrations = [];

// Load data on page load
window.addEventListener('load', function() {
    loadRegistrations();
});

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    const formData = {
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value,
        reason: document.getElementById('reason').value
    };
    
    // Send to Google Sheets
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        showSuccessMessage();
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
        // Reload data after submission
        setTimeout(() => loadRegistrations(), 1000);
    })
    .catch(error => {
        alert('Error submitting form. Please try again.');
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    });
});

function loadRegistrations() {
    fetch(SCRIPT_URL + '?action=get')
    .then(response => response.json())
    .then(data => {
        registrations = data;
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Registration successful! Thank you for registering.';
    
    const form = document.getElementById('registrationForm');
    form.parentNode.insertBefore(message, form);
    
    setTimeout(() => message.remove(), 3000);
}

function downloadExcel() {
    if (registrations.length === 0) {
        alert('No registrations to download!');
        return;
    }
    
    const worksheet = XLSX.utils.json_to_sheet(registrations.map(reg => ({
        'Registration Time': reg.timestamp,
        'Patient Name': reg.name,
        'Age': reg.age,
        'Gender': reg.gender,
        'Mobile Number': reg.mobile,
        'Address': reg.address,
        'Reason to Visit': reg.reason
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    
    const fileName = `AAROG26_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
}

function viewRegistrations() {
    const listDiv = document.getElementById('registrationsList');
    
    if (registrations.length === 0) {
        listDiv.innerHTML = '<p style="color: #777;">No registrations yet.</p>';
        return;
    }
    
    listDiv.innerHTML = '<h3>Registered Patients (' + registrations.length + ')</h3>';
    
    registrations.forEach((reg, index) => {
        const item = document.createElement('div');
        item.className = 'registration-item';
        item.innerHTML = `
            <h4>${index + 1}. ${reg.name}</h4>
            <p><strong>Age:</strong> ${reg.age} | <strong>Gender:</strong> ${reg.gender}</p>
            <p><strong>Mobile:</strong> ${reg.mobile}</p>
            <p><strong>Address:</strong> ${reg.address}</p>
            <p><strong>Reason:</strong> ${reg.reason}</p>
            <p><strong>Registered:</strong> ${reg.timestamp}</p>
        `;
        listDiv.appendChild(item);
    });
    
    document.getElementById('hideBtn').style.display = 'inline-block';
}

function hideRegistrations() {
    document.getElementById('registrationsList').innerHTML = '';
    document.getElementById('hideBtn').style.display = 'none';
}

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    const arrow = document.getElementById('adminArrow');
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        panel.style.display = 'none';
        arrow.textContent = '▼';
        // Reset auth state when closing
        document.getElementById('adminAuth').style.display = 'block';
        document.getElementById('adminButtons').style.display = 'none';
        document.getElementById('adminPassword').value = '';
        document.getElementById('authError').style.display = 'none';
    }
}

function verifyAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'aarog') {
        document.getElementById('adminAuth').style.display = 'none';
        document.getElementById('adminButtons').style.display = 'block';
        document.getElementById('authError').style.display = 'none';
    } else {
        document.getElementById('authError').style.display = 'block';
        document.getElementById('adminPassword').value = '';
    }
}

function removeLastEntry() {
    if (registrations.length === 0) {
        alert('No registrations to remove!');
        return;
    }
    
    const lastEntry = registrations[registrations.length - 1];
    if (confirm(`Remove last entry?\n\nName: ${lastEntry.name}\nAge: ${lastEntry.age}\nMobile: ${lastEntry.mobile}`)) {
        fetch(SCRIPT_URL + '?action=removeLast', {
            method: 'POST',
            mode: 'no-cors'
        })
        .then(() => {
            alert('Last entry removed successfully!');
            loadRegistrations();
            // Refresh the view if it's currently displayed
            const listDiv = document.getElementById('registrationsList');
            if (listDiv.innerHTML !== '') {
                setTimeout(() => viewRegistrations(), 1000);
            }
        })
        .catch(error => {
            alert('Error removing entry. Please try again.');
            console.error('Error:', error);
        });
    }
}


