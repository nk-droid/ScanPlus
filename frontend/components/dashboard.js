import { SideBar } from "./sidebar.js";

export const Dashboard = {
  template: `


  <div>
  <button type="button" class="btn button-color align-button" style="margin-left:90px; margin-top:100px;">  <h4 style="font-size:15px; margin:3.5px;">  <router-link to="/predict" class="link-style">Scan</router-link> </h4> </button> 
        <button type="button" class="btn button-color" style="margin-left:10px; margin-top:100px;">  <h4 style="font-size:15px; margin:3.5px;">  <router-link to="/ask" class="link-style">Ask</router-link> </h4> </button>
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
     <button class="btn btn-secondary button-color center" style="float: right; margin-top:-50px; margin-right:20px" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="showPrescription(key)"> View Results </button>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered custom-modal-width">
    <div class="modal-content">
    <div class="modal-body" v-if="selectedPrescriptionId">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <table class="custom-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Test Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in groupedData[selectedPrescriptionId]" :key="item.prescription_id">
            <td>{{ item.medicine_name || '-' }}</td>
            <td>{{ item.dosage || '-' }}</td>
            <td>{{ item.frequency || '-' }}</td>
            <td>{{ item.duration || '-' }}</td>
            <td>{{ item.test_name || '-' }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="modal-body" v-else>
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
      currentDateTime: null,
      selectedPrescriptionId: null
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
        const response = await fetch('http://34.70.170.10:5000/api/user/upload_prescription', {
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
    },
    showPrescription(key) {
      this.selectedPrescriptionId = key
    }
  }
}
