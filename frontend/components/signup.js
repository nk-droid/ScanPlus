export const SignUp = {
    template: `
    <div class="jumbotron p-5">
      <br> <br>
  
      <!-- Row 1 starts -->
      <div class="row">
        <div class="col-4"> </div>
        <h1>
          <center>
            Create your Account
          </center>
        </h1>
        <div class="col-4"> </div>
      </div>
      <!-- Row 1 ends -->
      <br> <br>
      
      <!-- Row 2 starts -->
      <div class="row">
        <div class="col-3"> </div>
        <div class="col-6">
          <!-- row2 col 2-->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input type="email" class="form-control" id="email" v-model="email">
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="firstname" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstname" v-model="firstname">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="lastname" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastname" v-model="lastname">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="whatsapp_no" class="form-label">WhatsApp Number</label>
                <input type="text" class="form-control" id="whatsapp_no" v-model="whatsapp_no">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
            </div>
          </div>
        </div>
        <div class="col-3"> </div>
      </div>
      <!-- Row 2 ends -->
      
      <!-- row 3 starts -->
      <div class="row">
        <div class="col-3"> </div>
        <div class="col-6 fluid">
          <button class="btn btn-light center button-color" @click="signup"> 
            <p style="color:#ffffff; margin-bottom:0px;"> Submit </p> 
          </button>
        </div>
        <div class="col-3"> </div>
      </div>
      <!-- row 3 ends -->
  
    </div>
    `,
    
    data: function() {
      return {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        whatsapp_no: '',
        password: ''
      }
    },
  
    methods: {
      signup: async function() {
        const data = {
          username: this.username,
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          whatsapp_no: this.whatsapp_no,
          password: this.password
        }
        
        if(String(this.email).toLowerCase()) {
          if (String(this.password).length >= 6) {
            await fetch('http://34.70.170.10:5000/api/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(responseJson => { if(responseJson.message=="User created successfully"){
              
              this.$router.push('/login')
            }
            })
          }
        } 
        
      }
    }
  }
  
