export const Login = {
    template: `
        <div>
  
          <br> <br> <br> <br> <br>
  
    <div class="jumbotron p-5">
  
  
      <!-- Row 1 starts -->
      <div class="row">
  
        <div class="col-4"> </div>
        <div class="col-6">
          <h1>Log In to Your Account</h1>
        </div>
        <div class="col-4"> </div>
  
      </div>
      <!-- Row 1 ends -->
      <br> 
      <!-- Row 2 starts -->
      <div class="row">
        <div class="col-3"> </div> <!-- row2 col 1-->
        <div class="col-6">
          <!-- row2 col 2-->
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
              <!-- <div id="emailHelp" class="form-text">Never share your username with anyone else.</div> -->
            </div>
        </div>
        <!-- row 2 col 2 ends-->
        <div class="col-3"> </div>
        <!--row2 col3-->
      </div>
      <!-- Row 3 ends -->
      <!-- Row 3 starts -->
      <div class="row">
        <div class="col-3"> </div> <!-- row2 col 1-->
        <div class="col-6">
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
          </div>
        </div>
        <!-- row 3 col 2 ends-->
        <div class="col-3"> </div>
        <!--row3 col3-->
      </div>
      <!-- row 3 ends-->
      
  
      <!-- row 4 starts-->
      <div class="row">
        <div class="col-3"> </div> <!-- row2 col 1-->
        <div class="col-6 fluid">
        <button class="btn btn-secondary button-color center" @click="login"> Submit </button>
  
           <div> 
           <br>
        Don't have an account? <router-link to="/signup" style="color: rgb(100, 55, 184);">Register</router-link>
        </div>
        
        </div>
        <!-- row4 col2 ends-->
  
        <div class="col-3"> </div> <!-- row 4 col3-->
        
      </div>
      <!-- row 4 ends-->
  
  
    </div>
    <!--jumbotron ends-->
        
    
        </div>`,
  
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
          const data = {
              email: this.email,
              password: this.password
          }
  
          if(String(this.email).toLowerCase()) {
              if (String(this.password).length >= 6) {
                  fetch('http://localhost:5000/api/signin', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                  })
                  .then(response => response.json())
                  .then(responseJson => {         
                      localStorage.setItem("authentication_token",responseJson.response.user.authentication_token)
                      this.$router.go('/dashboard')
                  })
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Wrong Password Format',
                    text: 'Password must be atleast 6 characters long.'
                  })
              }
          } 
        }
    }
  }