export const Dashboard = {
  template: `


  
  <div>
  <div class="page-content p-5" id="content"> 
        <div class="container py-5 display-4"> 

<!--start-->

                           
<!--time-->
<div>
    <p style="color: rgb(112, 112, 112); margin-bottom: 0px; margin-left: 6px; margin-top: 4px; font-size:20%;"> &#128337; &nbsp; {{currentDateTime}}</p>
    
</div>

<!--time-->
<br>




<br>

<!--med starts-->
<div class="div12" v-for="(prescriptions, key) in groupedData" :key="key">
     <img src="frontend/assets/prescription.png" height="90px" width="165" style="margin-left:-40px; margin-top:-5px;"> 
     <p style="margin-left: 100px; margin-top:-68px; color: #515b9d; font-size:15px;"> Prescription {{key}} </p>
     <p style="margin-left: 100px; margin-top:-10px; color: #515b9d; font-size:12px;"> {{prescriptions[0].timestamp}} </p>
     <button class="btn btn-secondary button-color center" style="float: right; margin-top:-50px; margin-right:20px" data-bs-toggle="modal" data-bs-target="#exampleModal"> View Results </button>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
    </div>
  </div>
</div>

<!--med ends-->
  </div> 
 </div>    
</div>
  `,

  data: function() {
    return {
      groupedData: {},
      currentDateTime: null
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    setInterval(() => {
      let options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
      };
      let date = new Date()
      this.currentDateTime = date.toLocaleTimeString("en-us", options);
    }, 1000);
  },
  methods: {
    async fetchData() {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://127.0.0.1:5000/api/user/upload_prescription', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authentication_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data received:', data);
        this.groupedData = data;
        console.log('Grouped data:', this.groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}