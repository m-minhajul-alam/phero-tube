const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    console.log(data);

    const tabContainer = document.getElementById("tab-container")

    data.data.forEach(categorys => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleCards('${categorys?.category_id}')" id="active-tab" class="tab"> ${categorys?.category} {</a>
        `
        tabContainer.appendChild(div);
    });

    // console.log(data.data);

}

const handleCards = async (categoryId) => {

    // const activeTab = document.getElementById('active-tab');
    // activeTab.classList.add('tab-active');

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(data);

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // console.log(cardContainer);

    data.data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-lg">
                    <figure><img class="rounded-lg h-52 lg:h-36 w-full" src=${element?.thumbnail} alt="Shoes" /></figure>
                    <div class="flex justify-center gap-3 p-3 ">

                        <div>
                            <img class="h-10 lg:h-8 w-10 lg:w-8 rounded-full" src=${element?.authors[0]?.profile_picture} alt="">
                        </div>

                        <div class="flex-1">
                            <h2 class="text-sm font-bold">${element?.title}</h2>
                            <p class="text-xs font-normal pt-1">${element?.authors[0]?.profile_name}</p>
                            <p class="text-xs font-normal pt-1">${element?.others?.views} views</p>
                        </div>

                    </div>
                </div>
        `
        cardContainer.appendChild(div)
    });

    // console.log(data.data.thumbnail)
}


handleCategory()