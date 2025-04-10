async function loadChapter() {
    const pathSegments = window.location.pathname.split('/');
    const chapterId = pathSegments[pathSegments.length - 1]; // Lấy phần tử cuối cùng

    const response = await fetch(`http://localhost:8080/chapter/get_chapter/${chapterId}`);
    const data = await response.json();
    const Container = document.getElementById('chapterload-container');
    
    data.chapter.content.forEach(img => {
        const chapterContent = `
            <img src="../../data/${img}">
        `;
        Container.innerHTML += chapterContent;
    });
}

loadChapter();