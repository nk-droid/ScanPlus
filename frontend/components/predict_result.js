export const PredictResult = {
  template: `
    <div class="container">
      <h1 class="text-center">Prediction Result</h1>
      <div v-if="parsedData" class="row mt-4">
        <div class="col-6">
          <h2>Prescription Date: {{ formattedDate }}</h2>
          <div>
            <h3>Medicines:</h3>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine Name</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Dosage</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(medicine, index) in parsedData.medicines" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ medicine.name }}</td>
                  <td>{{ medicine.frequency }}</td>
                  <td>{{ medicine.duration }}</td>
                  <td>{{ medicine.dosage }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>Tests:</h3>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Test Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(test, index) in parsedData.tests" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ test.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-6 text-center">
          <h3>Uploaded Image:</h3>
          <img :src="image" alt="Uploaded Prescription" class="img-fluid" style="max-width: 100%; height: auto;" />
        </div>
      </div>
      <div v-else class="text-center mt-4">
        <p>No data available.</p>
      </div>
    </div>
  `,

  data() {
    return {
      parsedData: null,
      image: null
    }
  },

  created() {
    const data = this.$route.query.data;
    const image = this.$route.query.image;
    if (data) {
      this.parsedData = JSON.parse(data);
    }
    if (image) {
      this.image = image;
    }
  },

  computed: {
    formattedDate() {
      if (!this.parsedData || !this.parsedData.prescription_date) return '';

      const dateParts = this.parsedData.prescription_date.split('-');
      if (dateParts.length === 3) {
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      }
      return this.parsedData.prescription_date;
    }
  }
}
