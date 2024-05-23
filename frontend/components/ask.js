export const Ask = {
    template: `
    <div>
        <br> <br>
      
        <div class="container"> 
            <div class="col">
                <h1 style="margin-left: 30px; font-size:60px; text-align:center;">
                    ScanPlus+
                </h1>
            </div>

            <p style="color:rgb(95, 95, 95); margin-left: 30px; font-size:20px; margin-top: 10px; text-align:center;">
            Ask any questions about your medications and health!

            </p>

            <br> <br> <br>

            <form>

            <div class="mb-3">
            <label for="basic-url" class="form-label">Message ScanPlus+</label>
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Ask</span>
                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
            </div>
            </div>

                <button type="button" @click="onUpload" class="btn btn-light lightpurple center block margin-auto" style="display: flex; justify-content: center; color:rgb(74, 105, 133);">
                    <p style="color: #515b9d; margin-bottom: 0px;"> Send </p>
                </button>

            
            </form> 
<br>

           <p>hi thi!S </p>

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
            await fetch('http://localhost:5000/upload_prescription', {
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

