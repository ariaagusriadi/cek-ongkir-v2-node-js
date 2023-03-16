function loadProvinsi() {
  fetch("/api/province")
    .then((res) => res.json())
    .then((data) => {
      let temp =
        '<option value="" selected="" disabled="">-- Pilih Provinsi --</option>';
      data.rajaongkir.results.forEach((rs) => {
        temp += `<option value="${rs.province_id}">${rs.province}</option>`;
      });
      document.getElementById("prov1").innerHTML = temp;
      document.getElementById("prov2").innerHTML = temp;
    })
    .catch((err) => alert(err));
}

function loadKota(id, el) {
  fetch(`/api/kota/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let temp =
        '  <option value="" selected="" disabled="">-- Pilih Kota --</option>';
      data.rajaongkir.results.forEach((rs) => {
        temp += `<option value="${rs.city_id}">${rs.city_name}</option>`;
      });
      document.getElementById(el).innerHTML = temp;
    })
    .catch((err) => alert(err));
}

function cekOngkir() {
  const asal = document.getElementById("kot1").value;
  const tujuan = document.getElementById("kot2").value;
  const berat = document.getElementById("berat").value;
  const kurir = document.getElementById("kurir").value;

  if (asal != "" && tujuan != "" && berat != "" && kurir != "") {
    fetch(`/api/ongkos/${asal}/${tujuan}/${berat}/${kurir}`)
      .then((res) => res.json())
      .then((data) => {
        let temp = "";
        const ro = data.rajaongkir;
        if (ro.status.code == 200) {
          temp += `<table cellpadding="5" border="1" style="border-collapse: collapse;">
                  <tr><td colspan="4" style="text-align:center"> <b>${ro.results[0].name} - ${ro.results[0].code}</b> </td></tr>
                  <tr>
                       <th>Service</th>
                       <th>Description</th>
                       <th>Cost</th>
                       <th>Estimated</th>
                  </tr>
                  `;
          const costs = ro.results[0].costs;
          for (let i = 0; i < costs.length; i++) {
            temp += `
                       <tr>
                       <td><b>${costs[i].service}</b></td>
                       <td><b>${costs[i].description}</b></td>
                       <td><b>Rp.${costs[i].cost[0].value.toLocaleString()}</b></td>
                       <td><b>${costs[i].cost[0].etd} day</b></td>
                  </tr>
                       `;
          }
          temp += `</table`;
          document.getElementById("hasil").innerHTML = temp;
        } else {
          alert(
            "Sepertinya ada ganguan dari rajaongkir/ koneksi anda bermasalah!"
          );
        }
      })
      .catch((err) => alert(err));
  } else {
    alert("Mohon lengkapi data terlebih dahulu");
  }
}
