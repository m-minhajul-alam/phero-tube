document.getElementById("blog-btn").addEventListener('click', function () {
    location.href = 'blog.html';
})
document.getElementById("blog-btn2").addEventListener('click', function () {
    location.href = 'blog.html';
})

const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    const tabContainer = document.getElementById("tab-container")

    data.data.forEach(categorys => {

        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleCards('${categorys?.category_id}')" id="active-tab" class="tab bg-secondory font-medium text-sm py-1 px-2 rounded cursor-pointer ml-2"> ${categorys?.category}</a>
        `
        tabContainer.appendChild(div);

        const activeTab = document.getElementById('active-tab');
        activeTab.classList.remove('bg-secondory');
        activeTab.classList.add('bg-primary', 'text-white',);
    });

}

const handleCards = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (data.status === false) {
        const err = document.getElementById('err');
        err.classList.remove('hidden')

    } else {
        const err = document.getElementById('err');
        err.classList.add('hidden')
    }

    data.data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="rounded-lg">
                 <div>
                    <img class="rounded-lg h-52 lg:h-36 w-full" src=${element?.thumbnail} alt=""/>
                    <p class="text-[8px] text-white font-normal bg-gray-800 p-1 mt-[-22px] ml-44 rounded absolute">3hrs 56 min ago</p>
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
    });

}

const handleSortView = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`);
    const data = await res.json();

    let arr = [];
    console.log(arr)
    data.data.forEach(element => {
        const totalViews = element.others.views
        const total = totalViews.innerText
        console.log(total)
        arr.push(total)
    })

}

handleCards("1000")
handleCategory()