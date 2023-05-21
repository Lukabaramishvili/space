<template>
  <div v-if="!signupSuccess && !signupError">
    <form class="registration-form" @submit="submitForm">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" placeholder="Thomas" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" placeholder="Shelby" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="thomas@shelby.co.uk" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Password" required />
        <p class="error-message">{{ errors.password }}</p>
      </div>
      <button class="submit-button" @click="submitForm" :disabled="isLoading">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Sign Up</span>
      </button>
    </form>
  </div>
  <p v-if="signupSuccess" class="success-message">
    You have successfully signed up!
    <br />
    <span>Email confirmation was sent to {{ email }} (Optional)</span>
  </p>
  <div v-if="signupError" class="signupError-message">
    <p>An error occurred while signing up. Please try again.</p>
    <button class="reload-button" @click="reloadPage">Reload</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false,
      signupSuccess: false,
      signupError: false
    }
  },
  methods: {
    async submitForm(event) {
      event.preventDefault()
      this.errors = {}

      if (!this.email) {
        this.errors.email = 'Email is required.'
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = 'Invalid email format.'
      }

      if (!this.password) {
        this.errors.password = 'Password is required.'
      } else if (this.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters long.'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(this.password)) {
        this.errors.password = 'Password must contain both lowercase and uppercase letters.'
      } else if (this.password.includes(this.firstName) || this.password.includes(this.lastName)) {
        this.errors.password = 'Password should not contain your first or last name.'
      }

      // If there are no errors, submit the form
      if (Object.keys(this.errors).length === 0) {
        this.isLoading = true
        try {
          const response = await fetch('https://demo-api.now.sh/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email
            })
          })

          if (response.ok) {
            this.signupSuccess = true
          } else {
            this.signupError = true
          }
        } catch (error) {
          console.log(error)
          this.signupError = true
        } finally {
          this.isLoading = false
        }
      }
    },
    reloadPage() {
      window.location.reload()
    },
    isValidEmail(email) {
      // Email validation Regex
      return /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?<!\.)$/.test(email)
    }
  }
}
</script>

<style>
.is-invalid {
  border-color: red;
}

.success-message,
.signupError-message,
.registration-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.error-message {
  margin-top: 4px;
  color: red;
  font-size: 12px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: #2897fc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #1589f6;
}

.success-message {
  background-color: #3cba54;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.signupError-message {
  background-color: #f44336;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.reload-button {
  background-color: #d32f2f;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reload-button:hover {
  background-color: #a81b1b;
}

@media (max-width: 768px) {
  .registration-form {
    max-width: 100%;
    padding: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'] {
    font-size: 12px;
  }

  .submit-button {
    font-size: 14px;
  }
}
</style>
