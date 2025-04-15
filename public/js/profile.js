const container = document.getElementById('profile');
async function getIdUser() {
    const response = await fetch('/auth/me', {
        method: 'GET',
        credentials: 'include' // Gửi cookie kèm request
    });
    if(response.ok) {
        const data = await response.json();
        return data.user._id; // Trả về ID người dùng
    } else {
        return null;
    }
}

async function getProfile() {
    const response = await fetch('http://localhost:8080/account/' + await getIdUser());
    const data = await response.json();
    
    if(data === null) {
        container.innerHTML = '<p>No found user</p>';
    }

    const profile = `
    <h3 class="text-white text-center mb-4">Thông tin cá nhân</h3>
    <form id="updateUser">
        <div class="form-group">
            <label for="email" class="text-white">Email:</label>
            <input type="email" class="form-control" id="email" value="${data.Account.email}" readonly>
            </div>
        <div class="form-group">
            <label for="name" class="text-white">Tên</label>
            <input type="text" class="form-control" id="name" value="${data.Account.name}" required>
        </div>
        <div class="form-group">
            <label for="phone" class="text-white">Phone</label>
            <input type="text" class="form-control" id="phone" value="${data.Account.phone ? data.Account.phone : ''}" required>
        </div>
        <div class="form-group">
            <label for="address" class="text-white">Address</label>
            <input type="text" class="form-control" id="address" value="${data.Account.address ? data.Account.address : ''}" required>
        </div>
            <button type="submit" class="btn btn-primary">Cập nhật thông tin</button>
    </form>
    `;
    container.innerHTML = profile;

    document.getElementById('updateUser').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
    
        const response = await fetch('http://localhost:8080/account/' + await getIdUser(), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, name, phone, address }),
        });
    
        if (response.ok) {
             // Tải lại trang để cập nhật thông tin
            window.location.reload();
            alert('Cập nhật thông tin thành công!');
        } else {
            alert(`Error: ${response.status} - ${result.message || 'Unknown error'}`);
        }
    });
}

async function init() {
    if(await getIdUser() !== null) {
        getProfile();
    } else {
        const profileNoLogin = `
            <h3 class="text-white text-center mb-4">You are not logged in</h3>
        `;
        container.innerHTML = profileNoLogin;
    }
}

init();
