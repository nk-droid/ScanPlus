export const PredictResult = {
    template: `
    <div>
    <br><br><br><br>
      <div class="jumbotron p-5">
        <!-- Row 1 starts -->
        <!-- Row 1 ends -->
        <!-- Row 2 starts -->
        <div class="row">
          <div class="col-3"> </div> <!-- row2 col 1-->
          <div class="col-6">
            <!-- row2 col 2-->
          </div>
          <div class="col-3"> </div>
          <!--row2 col3-->
        </div>
        <!-- Row 2 ends -->
        <!-- Row 3 starts -->
        <div class="row">
          <div class="col-3"><img :src="file" alt="Prescription" width="500" height="600"> </div>
          <!-- row2 col 1-->

          <div class="col"> </div>
          <div class="col-7">
            <div class="row">
              <div class="row">
                <div class="form-group purple-border">
                  <p style="text-align:center;" v-html="txt">
                  </p>
                </div>
              </div>
              <br><br><br><br><br><br><br>
            </div>

            <!-- row4 col2 ends-->

            <div class="col-3"> </div> <!-- row 4 col3-->
          </div>
        <!-- row 4 ends-->
        </div>
      </div>
      <div v-else>
        <div class="content">
          <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <!--jumbotron ends-->
    </div>
    `,
    
}

