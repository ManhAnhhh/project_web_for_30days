const apiKey = "f8f2a578e3e89174d0f26c2b0592362d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const urlImg = 'https://openweathermap.org/img/wn/';
const txtName = document.getElementById("txtName");
const wetherImg = document.querySelector(".weather img");
async function checkWeather(value) {
  const res = await fetch(`${apiUrl}&appid=${apiKey}&q=${value}&lang=vi`)
  const data = await res.json();
  if (data.cod == "404" || value == "") {
    document.querySelector(".card").style.background = "#8ACDD7";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".error").classList.add('fadeIn');
    document.querySelector(".card").style.transform = "translateY(-140px)";
    return;
  }
  console.log(data);
  document.querySelector(".weather-desc").innerText = `${capitalFirstLetter(data.weather[0].description)}`;
  document.querySelector(".temp").innerText = `${Math.round(data.main.temp)} ℃`;
  document.querySelector(".cityName").innerText = data.name;
  document.querySelector(".humidity").innerText = `${data.main.humidity} %`;
  document.querySelector(".wind").innerText = `${(data.wind.speed * 3.6).toFixed(2)} km/h `;

  // icon weather có thể dùng trực tiếp của API hoặc dùng trong file img cx đc
  // wetherImg.src = `${urlImg}${data.weather[0].icon}.png`;
  wetherImg.src = isCheckIconImg(data.weather[0].main);

  document.querySelector(".card").style.background = "linear-gradient(135deg, #00f3ba, #5b548a)";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".weather").classList.add = "fadeIn";
  document.querySelector(".card").style.transform = "translateY(-190px)";

}
const capitalFirstLetter = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
const isCheckIconImg = (value) => {
  if (value == "Clear") return "./images/clear.png";
  if (value == "Clouds") return "./images/clouds.png";
  if (value == "Drizzle") return "./images/drizzle.png";
  if (value == "Mist") return "./images/mist.png";
  if (value == "Rain") return "./images/rain.png";
  if (value == "Snow") return "./images/snow.png";
}

document.querySelector(".search button").addEventListener("click", () => {
  checkWeather(txtName.value);
});
document.querySelector(".search input").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    checkWeather(txtName.value);
  }
});
document.querySelector(".search .local").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(`${apiUrl}&appid=${apiKey}&lang=vi&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          document.querySelector(".weather-desc").innerText = `${capitalFirstLetter(data.weather[0].description)}`;
          document.querySelector(".temp").innerText = `${Math.round(data.main.temp)} ℃`;
          document.querySelector(".cityName").innerText = data.name;
          document.querySelector(".humidity").innerText = `${data.main.humidity} %`;
          document.querySelector(".wind").innerText = `${(data.wind.speed * 3.6).toFixed(2)} km/h `;
          wetherImg.src = isCheckIconImg(data.weather[0].main);
          document.querySelector(".card").style.background = "linear-gradient(135deg, #00f3ba, #5b548a)";
          document.querySelector(".error").style.display = "none";
          document.querySelector(".weather").style.display = "block";
          document.querySelector(".weather").classList.add = "fadeIn";
          document.querySelector(".card").style.transform = "translateY(-190px)";
        })
    });
  }
  else alert("Trình duyệt của bạn không hỗ trợ Geolocation")
});