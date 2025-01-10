const apiKey = "891060519296be31fbe8978dde07a559"; //! API Key dari OpenWeatherMap
        const locations = ["seul", "china", "Tokyo"]; //! Lokasi default

        
        function displayDefaultWeather() {
            const defaultWeather = document.getElementById("defaultWeather");
            defaultWeather.innerHTML = ""; 

            locations.forEach((location) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=id`;

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.cod === 200) {
                            const { name, main, weather, wind, clouds } = data;
                            const description = weather[0].description;
                            const weatherCard = `
                                <div class="weather-card">
                                    <h3>📍${name}</h3>
                                    <p class="Suhu">🌡️ ${main.temp}°C</p>
                                    <p>Kondisi ${description}</p>
                                    <p>Kelembapan 💧 ${main.humidity}%</p>
                                    <p>Angin ${wind.speed} M/S</p>
                                    <p>Awan ☁️ ${clouds.all}%</p>
                                </div>
                            `;
                            defaultWeather.innerHTML += weatherCard;
                            displayWeatherImage(description);
                        } else {
                            defaultWeather.innerHTML += `<p>Kota ${location} tidak ditemukan.</p>`;
                        }
                    })
                    .catch((error) => {
                        console.error(`Error fetching weather for ${location}:`, error);
                        defaultWeather.innerHTML += `<p>Terjadi kesalahan saat memuat data untuk ${location}.</p>`;
                    });
            });
        }

        // Fungsi untuk menampilkan cuaca berdasarkan input user
        function searchWeather() {
            const city = document.getElementById("city").value.trim();
            const searchResult = document.getElementById("searchResult");

            if (!city) {
                searchResult.innerHTML = "<p>Nama kota harus diisi!</p>";
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
            console.log(url);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.cod === 200) {
                        const { name, main, weather, wind, clouds } = data;
                        const description = weather[0].description;
                        const weatherCard = `
                            <div class="weather-card">
                                <h3>${name}</h3>
                                <p class="Suhu">🌡️ ${main.temp}°C</p>
                                <p id"kondisi">Kondisi ${description}</p>
                                <p>Kelembapan 💧${main.humidity}%</p>
                                <p>Angin ${wind.speed} M/S</p>
                                <p>Awan ☁️ ${clouds.all}%</p>
                            </div>
                        `;
                        searchResult.innerHTML = weatherCard;
                        displayWeatherImage(description);
                    } else {
                        searchResult.innerHTML = `<p>Kota ${city} tidak ditemukan.</p>`;
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching weather for ${city}:`, error);
                    searchResult.innerHTML = `<p>Terjadi kesalahan saat memuat data untuk ${city}.</p>`;
                });
        }

        //todo: pemanggilan gambar dan penambahan parameter fungsi
        function displayWeatherImage(description) {
            const weatherImage = document.getElementById("weatherImage");

            let imageSrc;
            if (description.includes("hujan")) {
                imageSrc = "/picture/rain.png"; 
            } else if (description.includes("cerah")) {
                imageSrc = "/picture/cerah.png"; 
            } else if (description.includes("berawan")) {
                imageSrc = "/picture/berawan.png"; 
            }else if (description.includes("awan tersebar")) {
                imageSrc = "/picture/berawan.png"
            }else if (description.includes("awan pecah")) {
                imageSrc = "/picture/berawan.png"
            }else if (description.includes("awan mendung")) {
                imageSrc = "/picture/berawan.png" 
                locations[0].innerHTML += `<p> ${location}.</p>`;   
             } //else if (description.includes("")) {
            //     imageSrc = "/picture/cerah.png"; 

            weatherImage.innerHTML = `<img src="${imageSrc}" alt="${description}" style="width: 100%;">`;
        }

        //* Panggil fungsi untuk menampilkan cuaca default saat halaman dimuat

        document.addEventListener("DOMContentLoaded", displayDefaultWeather);