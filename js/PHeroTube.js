const handleBlogs = () => {
    location.href = 'blog.html';
}

const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    const tabContainer = document.getElementById("tab-container");

    data.data.forEach(categorys => {

        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleCards('${categorys?.category_id}')" id="active-tab" class="tab bg-secondory font-medium text-sm py-1 px-4 rounded cursor-pointer mx-2"> ${categorys?.category}</a>
        `
        tabContainer.appendChild(div);
    });

}

const handleCards = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (data.status === false) {
        const err = document.getElementById('err');
        err.classList.remove('hidden');

    } else {
        const err = document.getElementById('err');
        err.classList.add('hidden');
    }

    data.data.forEach(element => {

        const totalSec = element.others?.posted_date;
        const newDate = new Date(totalSec * 1000);
        const hour = newDate.getUTCHours();
        const minutes = newDate.getUTCMinutes();

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-lg">
            <div>
                <img class="rounded-lg h-52 lg:h-36 w-full" src=${element?.thumbnail} alt=""/>
                <div>${(element?.others?.posted_date) ? `<p class="text-[8px] text-white font-normal bg-gray-800 p-1 mt-[-26px] ml-[6px] md:ml-[300px] lg:ml-[170px] rounded absolute"> ${hour} hrs ${minutes} min ago </p>` : ''}</div>
            </div>
            <div class="flex justify-center gap-3 py-3 ">
                <div>
                    <img class="h-10 lg:h-8 w-10 lg:w-8 rounded-full" src=${element?.authors[0]?.profile_picture} alt="">
                </div>
                <div id="auter-name" class="flex-1">
                    <h2 class="text-sm font-bold">${element?.title}</h2>
                    <div id="auther-name" class="flex items-center gap-2">
                        <p class="text-xs font-normal pt-1">${element?.authors[0]?.profile_name}</p>
                        <p>${(element.authors[0].verified) ? '<img class="w-4 pt-1" src="./icons/blue.png" alt=""></img>' : ''} </p>
                    </div>
                    <p class="text-xs font-normal pt-1">${element?.others?.views} views</p>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(div);
    });

}

const handleSortView = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await res.json();

    const sortView = data.data;

    sortView.sort(function (a, b) {
        const frist = a.others.views.split("").slice(0, 3);
        const fristFinal = parseFloat(frist.map(String).join(''));
        const second = b.others.views.split("").slice(0, 3);
        const secondFinal = parseFloat(second.map(String).join(''));
        return secondFinal - fristFinal;
    })

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const err = document.getElementById('err');
    err.classList.add('hidden');

    sortView.forEach((element) => {

        const totalSec = element.others?.posted_date;
        const newDate = new Date(totalSec * 1000);
        const hour = newDate.getUTCHours();
        const minutes = newDate.getUTCMinutes();

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-lg">
            <div>
                <img class="rounded-lg h-52 lg:h-36 w-full" src=${element?.thumbnail} alt=""/>
                <div>${(element?.others?.posted_date) ? `<p class="text-[8px] text-white font-normal bg-gray-800 p-1 mt-[-26px] ml-[6px] md:ml-[300px] lg:ml-[170px] rounded absolute"> ${hour} hrs ${minutes} min ago </p>` : ''}</div>
            </div>   
            <div class="flex justify-center gap-3 py-3 ">
                <div>
                    <img class="h-10 lg:h-8 w-10 lg:w-8 rounded-full" src=${element?.authors[0]?.profile_picture} alt="">
                </div>
                <div id="auter-name" class="flex-1">
                    <h2 class="text-sm font-bold">${element?.title}</h2>
                    <div id="auther-name" class="flex items-center gap-2">
                        <p class="text-xs font-normal pt-1">${element?.authors[0]?.profile_name}</p>
                        <p>${(element.authors[0].verified) ? '<img class="w-4 pt-1" src="./icons/blue.png" alt=""></img>' : ''} </p>
                    </div>
                    <p class="text-xs font-normal pt-1">${element?.others?.views} views</p>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(div)
    })
};

handleCards("1000");
handleCategory();