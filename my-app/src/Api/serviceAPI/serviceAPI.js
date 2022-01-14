function fetchImg(name, page) {
  const apiKey = "24120553-f8b1f79ab38ca933100336740";
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${apiKey}`;
  return fetch(BASE_URL).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`has no image with name ${name}`));
  });
}

const api = {
  fetchImg,
};

export default api;
