
  async function getFace() {
    let response = await fetch('https://thispersondoesnotexist.com/',{
      method: 'GET',

    });

    let result = await response.json();
    document.getElementById("myImg").src = result.faces[0].urls[4]["512"];
  }
  getFace();
