class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    // Save the elements for later use
    // nameSelector = ".profile__title"
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  // Method to get the current user information
  // Use this when opening the profile modal
  getUserInfo() {
    return {
      userName: this.nameElement.textContent, // Get the name from the element
      job: this.jobElement.textContent, // Get the job from the element
    };
  }

  // Method to set new user information when the form is submitted
  setUserInfo(userName, job) {
    // Update the text content of the elements
    this.nameElement.textContent = userName;
    this.jobElement.textContent = job;
  }
}
export default UserInfo;
