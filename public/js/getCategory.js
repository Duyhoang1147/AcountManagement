async function fetchCategories() {
    const response = await fetch('http://localhost:8080/category');
    const data = await response.json();
    const containercategory = document.getElementById('category-container');
    containercategory.innerHTML = '';
    if (data.length === 0) {
        containercategory.innerHTML = '<p>No categories available</p>';
    }

    data.forEach(category => {
        const listcategory = `
            <li><a href="/categories/${category._id}">${category.name}</a></li>
        `;
        containercategory.innerHTML += listcategory;
    });
}

fetchCategories();