<template>
  <div class="center-container">
    <aqCard class="aq-card">
      <h1 class="title">
        <span class="aqua-title">Aqua</span>
        <span class="green-title">Green</span>
      </h1>
      <div class="v-form">
        <v-form ref="formRef" @submit.prevent="uploadFile" class="upload-form">
          <div class="form-group">
            <aqTextField
              label="Select File"
              variant="outlined"
              readonly
              :value="selectedFile ? selectedFile.name : 'No file chosen'"
              @click="triggerFileInput"
              class="clickable-textfield"
            />
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden-input" />
            <aqBtn v-if="selectedFile" type="button" @click="removeFile" label="Remove File" color="red" />
          </div>

          <!-- File Preview Section -->
          <div v-if="previewUrl" class="preview-container">
            <img v-if="isImage" :src="previewUrl" class="preview-image" alt="Preview" />
            <video v-else-if="isVideo" :src="previewUrl" controls class="preview-video"></video>
            <p v-else class="preview-text">File selected: {{ selectedFile.name }}</p>
          </div>

          <div class="form-group full-width-button">
            <aqBtn type="submit" label="Upload" color="#1d8618" />
          </div>
        </v-form>
        <p v-if="uploadMessage" class="upload-message">{{ uploadMessage }}</p>
      </div>
    </aqCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import aqBtn from '../../components/aqBtn.vue';
import aqTextField from '../../components/aqTextField.vue';
import aqCard from '../../components/aqCard.vue';

const selectedFile = ref(null);
const uploadMessage = ref("");
const fileInput = ref(null);
const previewUrl = ref(null);
const isImage = ref(false);
const isVideo = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    previewUrl.value = URL.createObjectURL(file);

    // Check file type for preview
    isImage.value = file.type.startsWith("image/");
    isVideo.value = file.type.startsWith("video/");
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  isImage.value = false;
  isVideo.value = false;

  // Reset input field
  fileInput.value.value = "";
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadMessage.value = "Please select a file first.";
    return;
  }

  let formData = new FormData();
  formData.append("file", selectedFile.value);

  const apiUrl = "https://your-backend.com/api/upload"; // Replace with your actual API

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    uploadMessage.value = "File uploaded successfully!";
    console.log(response.data);
  } catch (error) {
    uploadMessage.value = "File upload failed!";
    console.error(error.response?.data || error.message);
  }
};
</script>

<style scoped>
.aq-card {
  width: 500px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
  margin: auto;
  justify-content: center;
}

.title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.aqua-title {
  color: #d3781e;
  font-style: italic;
}

.green-title {
  color: #1d8618;
  font-style: italic;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.hidden-input {
  display: none;
}

.clickable-textfield {
  cursor: pointer;
}

.upload-message {
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}

/* Preview Styles */
.preview-container {
  margin-top: 10px;
  text-align: center;
}

.preview-image {
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 8px;
}

.preview-video {
  width: 100%;
  max-height: 250px;
  border-radius: 8px;
}

.preview-text {
  font-weight: bold;
}
</style>
