async function getUserid() {
    const response = await fetch('/auth/me', {
        method: 'GET',
        credentials: 'include' // Gửi cookie kèm request
    });

    if(response.ok) {
        const data = await response.json();
        console.log(data.user._id)
        return data.user._id
    }
}

async function getHistory() {
    const response = await fetch(`http://localhost:8080/history/` + await getUserid())
    const data = await response.json()
    console.log(data);

    const container = document.getElementById('histories');
    console.log("Container:", container);

    if(data === null) {
        container.innerHTML = '<p>You are not logged in.</p>';
    }
    
    data.histories.forEach(history => {
        const story = history.storyId;
        const storyCard = `
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg=${story.URLimage}>
                        <div class="view"><i class="fa fa-eye"></i> ${story.seen}</div>
                    </div>
                    <div class="product__item__text">
                        <h5><a href="/detail/${story._id}">${story.name}</a></h5>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += storyCard;
    })

    const setBg = document.querySelectorAll('.set-bg');
    setBg.forEach(element => {
        const bg = element.getAttribute('data-setbg');
        element.style.backgroundImage = `url(${bg})`;
    });
}

getHistory();

