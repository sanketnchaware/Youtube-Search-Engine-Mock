const div = document.getElementById("data_div");

async function youtube(event) {
  event.preventDefault();
  div.innerHTML = "";
  const query = document.getElementById("searchin").value.trim();

  if (!query) return;

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&regionCode=IN&type=video&videoEmbeddable=true&key=${api_key}&maxResults=20`
    );
    const data = await res.json();

    data.items.forEach(({ id: { videoId } }) => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube.com/embed/${videoId}`;
      frame.allow = "fullscreen";
      div.appendChild(frame);
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }
}

async function showPopular() {
  div.innerHTML = "";

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoEmbeddable=true&regionCode=IN&key=${api_key}&maxResults=20`
    );
    const data = await res.json();

    data.items.forEach(({ id }) => {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube.com/embed/${id}`;
      frame.allow = "fullscreen";
      div.appendChild(frame);
    });
  } catch (error) {
    console.error("Failed to fetch popular videos:", error);
  }
}

showPopular();
