async function getStorybyCategory() {
    const categoryId = window.location.pathname.split('/').pop(); // Lấy ID danh mục từ URL
    const response = await fetch(`http://localhost:8080/story/category/${categoryId}`);
    const data = await response.json();
    console.log(data);
    const container = document.getElementById('category');

    data.stories.forEach(story => {
        const storyCard = `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="../${story.URLimage}">
                        <div class="view"><i class="fa fa-eye"></i> ${story.seen}</div>
                    </div>
                    <div class="product__item__text">
                        <h5><a href="/detail/${story._id}">${story.name}</a></h5>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += storyCard;
    });

    const setBg = document.querySelectorAll('.set-bg');
    setBg.forEach(element => {
        const bg = element.getAttribute('data-setbg');
        if (bg) {
            element.style.backgroundImage = `url("${bg}")`;
        }
    });
}

getStorybyCategory();