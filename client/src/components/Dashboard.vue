<template>
  <div class="container mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <form
      @submit.prevent="addDoctor"
      class="mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="name">
          Name
        </label>
        <input
          v-model="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Doctor Name" />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="specialty">
          Specialty
        </label>
        <input
          v-model="specialty"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="specialty"
          type="text"
          placeholder="Specialty" />
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="email">
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email" />
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit">
        Add Doctor
      </button>
    </form>
    <div>
      <h2 class="text-xl font-bold mb-2">Doctors</h2>
      <ul>
        <li
          v-for="doctor in doctors"
          :key="doctor.id"
          class="mb-2 flex justify-between items-center">
          <span>{{ doctor.name }} - {{ doctor.specialty }} - {{ doctor.email }}</span>
          <div>
            <button
              @click="editDoctor(doctor)"
              class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Edit
            </button>
            <button
              @click="deleteDoctor(doctor.id)"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="editing"
      class="mt-8">
      <h2 class="text-xl font-bold mb-4">Edit Doctor</h2>
      <form
        @submit.prevent="updateDoctor"
        class="mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editName">
            Name
          </label>
          <input
            v-model="editForm.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editName"
            type="text"
            placeholder="Doctor Name" />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editSpecialty">
            Specialty
          </label>
          <input
            v-model="editForm.specialty"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editSpecialty"
            type="text"
            placeholder="Specialty" />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editEmail">
            Email
          </label>
          <input
            v-model="editForm.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editEmail"
            type="email"
            placeholder="Email" />
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          Update Doctor
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      specialty: "",
      email: "",
      doctors: [],
      editing: false,
      editForm: {
        id: null,
        name: "",
        specialty: "",
        email: "",
      },
    };
  },
  methods: {
    async addDoctor() {
      const response = await fetch("http://localhost:3000/doctors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: this.name, specialty: this.specialty, email: this.email }),
      });
      if (response.ok) {
        const newDoctor = await response.json();
        this.doctors.push(newDoctor);
        this.name = "";
        this.specialty = "";
        this.email = "";
      } else {
        alert("Failed to add doctor");
      }
    },
    async fetchDoctors() {
      const response = await fetch("http://localhost:3000/doctors");
      const data = await response.json();
      this.doctors = data;
    },
    editDoctor(doctor) {
      this.editing = true;
      this.editForm = { ...doctor };
    },
    async updateDoctor() {
      const response = await fetch(`http://localhost:3000/doctors/update/${this.editForm.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.editForm),
      });
      if (response.ok) {
        const updatedDoctor = await response.json();
        const index = this.doctors.findIndex((d) => d.id === updatedDoctor.id);
        this.doctors[index] = updatedDoctor; // Update the array
        this.editing = false;
        this.editForm = { id: null, name: "", specialty: "", email: "" };
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to update doctor");
      }
    },
    async deleteDoctor(id) {
      const response = await fetch(`http://localhost:3000/doctors/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
      } else {
        alert("Failed to delete doctor");
      }
    },
  },
  mounted() {
    this.fetchDoctors();
  },
};
</script>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
