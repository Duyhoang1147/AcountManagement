async function fetchStories() {
    const response = await fetch('http://localhost:8080/story');
    const data = await response.json();
    const container = document.getElementById('story-container');
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<p>No stories available</p>';
    }

    data.forEach(story => {
        const storyCard = `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg=${story.URLimage}>
                        <div class="view"><i class="fa fa-eye"></i> ${story.seen}</div>
                    </div>
                    <div class="product__item__text">
                        <h5><a href="/story/${story._id}">${story.name}</a></h5>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += storyCard;
    });
}

// document.getElementById('logout-btn').addEventListener('click', async function (event) {
//     event.preventDefault(); // Ngừng hành động mặc định của link

//     // Gửi yêu cầu đến backend để xóa cookie
//     const response = await fetch('/auth/logout', {
//         method: 'GET',
//         credentials: 'include'  // Đảm bảo gửi cookie
//     });

//     const data = await response.json();

//     if (response.ok) {
//         // Sau khi logout thành công, chuyển hướng người dùng về trang đăng nhập
//         window.location.href = '/';
//     } else {
//         // Nếu có lỗi, hiển thị thông báo
//         alert('Logout failed: ' + data.message);
//     }
// });

fetchStories();