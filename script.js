const loadAllPost = async (searchText) => {
  document.getElementById("card").innerHTML = "";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      searchText ? `?category=${searchText}` : ""
    }`
  );

  const data = await res.json();
  disPlayPost(data.posts);
};

const disPlayPost = (posts) => {
  //   console.log(posts);
  posts.forEach((phone) => {
    const cardContainer = document.getElementById("card");
    const {
      author,
      image,
      category,
      comment_count,
      description,
      isActive,
      posted_time,
      title,
      view_count,
    } = phone;
    // console.log(phone);
    const div = document.createElement("div");

    div.classList.add("mb-4");
    div.innerHTML = `
     <div
                class="p-2 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
              >
                <div class="indicator">
                  <span class="indicator-item badge ${
                    isActive ? "bg-green-600" : "bg-red-600"
                  }"></span>
                  <div class="avatar">
                    <div class="w-24 rounded-xl">
                      <img
                        src=${image}
                      />
                    </div>
                  </div>
                </div>
                <div class="space-y-4 w-full">
                  <div class="flex gap-4 *:opacity-60">
                    <p># ${category}</p>
                    <p>Author: ${author.name}</p>
                  </div>
                  <h3 class="text-2xl font-bold opacity-70">
                    ${title}
                  </h3>
                  <p class="opacity-40">
                    ${description}
                   </p>
                  <hr class="border border-dashed border-gray-300" />
                  <div class="flex justify-between">
                    <div class="flex gap-4">
                      <div class="space-x-2 flex items-center">
                        <i
                          class="fa-regular fa-comment-dots"
                          aria-hidden="true"
                        ></i>
                        <p>${comment_count}</p>
                      </div>
                      <div class="space-x-2 flex items-center">
                        <i class="fa-regular fa-eye" aria-hidden="true"></i>
                        <p>${view_count}</p>
                      </div>
                      <div class="space-x-2 flex items-center">
                        <i class="fa-regular fa-clock" aria-hidden="true"></i>
                        <p>${posted_time} Min</p>
                      </div>
                    </div>
                    <div class="opacity-100">
                      <button
                        id="addToList"
                        onclick="markAsRead('${description}','${view_count}' )"
                        class="addToList btn btn-circle bg-green-500 btn-sm"
                      >
                        <i
                          class="fa-solid fa-envelope-open text-white"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    
    `;
    cardContainer.appendChild(div);
  });
};
const searchCetegory = () => {
  const searchText = document.getElementById("searchPosts").value;
  loadAllPost(searchText);
};

const markAsRead = (description, view_count) => {
  console.log(description, view_count);
  const titleContainer = document.getElementById("markAsReadContainer");
  const div = document.createElement("div");
  div.classList.add("bg-white", "rounded-lg");
  div.innerHTML = `
  <div class="p-4  flex justify-around">
  <h2 class="w-2/4">${description}</h2>
  <i class="fa-regular fa-eye" aria-hidden="true"> <span class="text-sm"> ${view_count}</span></i>
  </div>
  `;
  titleContainer.appendChild(div);
  markConut();
};

const markConut = () => {
  let counter = parseInt(
    document.getElementById("markAsReadCounter").innerText
  );
  const newConut = counter + 1;
  document.getElementById("markAsReadCounter").innerText = newConut;
};

const latestPost = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  displayLatestPost(data);
  console.log(data);
};

const displayLatestPost = (posts) => {
  posts.forEach((post) => {
    console.log(post);
    const postContainer = document.getElementById("latest-post-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
            <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                <i class="fa-solid fa-calendar-days me-2"></i
                >${
                  post.author.posted_date
                    ? post.author.posted_date
                    : "NO PUBLISH DATE"
                }
              </p>
              <h2 class="card-title text-start">${post.title}</h2>
              <p class="text-start">${post.description}</p>
              <div class="flex gap-8">
                <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                    <div
                      class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                      <img src="${post.profile_image}" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="text-start font-extrabold">${post.author.name}</h3>
                  <p class="text-start opacity-60">${
                    post.author.designation
                      ? post.author.designation
                      : "UNKONWN"
                  }
                  </p>
                </div>
              </div>
            </div>
          </div>
    `;
    postContainer.appendChild(div);
  });
};
latestPost();
loadAllPost();
