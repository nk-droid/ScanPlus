export const Predict = {
    template: `
    <div>
        <br> <br>
        <div class="container py-5 display-4">
            <span class="badge text-bg-light block margin-auto"> <h4 class="m-0 p-0" style="font-size:15px; margin:3.5px; color:rgb(51, 51, 51);">Dr. Reddy's ScanPlus+</h4></span> 
        </div>
        
        <div class="container"> 
            <div class="col">
                <h1 style="margin-left: 30px; font-size:60px; text-align:center;">
                    ScanPlus+
                </h1>
            </div>

            <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:20px; margin-top: 10px; text-align:center;">
                Upload a clear picture of your prescription.
            </p>

            <br> <br> <br>

            <form>
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Upload prescription image (.jpeg/.jpg/.png format only)
                    </label>
                    <input class="form-control" type="file" id="formFile" accept="image/png, image/jpg, image/jpeg" />
                </div>

                <button type="button" @click="onUpload" class="btn btn-light lightpurple center block margin-auto" style="display: flex; justify-content: center; color:rgb(74, 105, 133);">
                    <p style="color: #515b9d; margin-bottom: 0px;"> Upload </p>
                </button>
            
            </form> 

            <br> <br> <br> <br> <br> <br> <br>  
            
        </div>
    </div>
    `,

    data: function() {
      return {
        token: localStorage.getItem("authentication_token"),
        clicked: false
      }
    },

    methods: {
        async onUpload() {
          this.clicked = true
          var input = document.querySelector('input[type="file"]')
  
          var data_ = new FormData()
          data_.append('image', input.files[0])
          
          if(input.files[0] !== undefined) {
            await fetch('http://ec2-13-234-19-69.ap-south-1.compute.amazonaws.com:5000/api/upload', {
              method: 'POST',
              body: data_
            })
            if(this.token) {
                result = await Swal.fire({
                  title: 'What do you want to do?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonColor: 'rgb(100, 55, 184)',
                  cancelButtonColor: '#aaa',
                  confirmButtonText: 'Annotate',
                  cancelButtonText: 'See Results'
                })
                if (result.isConfirmed) {
                    this.$router.push('/annotator')
                  } else {
                    this.$router.push('/predict_result')
                  }
            } else {
              this.$router.push('/predict_result')
            }
          } else {
            Swal.fire(
              'Did you forget something?',
              'Please add a prescription first.',
              'question'
            )
          }
        }
    }
}

