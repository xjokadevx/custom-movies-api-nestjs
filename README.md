
# NEST JS + AES256 + CBC + RSA + SWAPI + JWT!

This is a traditional backend made in nestjs.
The power main in this project is S E C U R I T Y implementing AES256, CBC, RSA and JWT.
This project needs **`Node 16,18,22`** to works correctly.


# Before to start

If you want to run it, please keep in mind you need **RSA PUBLIC AND PRIVATE KEYS**.
Run the follow command for generate **RSA KEYS**

    npm run secrets

All environment variables must be encrypting using the [follow script](www.google.com) and put them in `.env` file.

Consult the `.env.example` for set each varible using the specif key for each one.

> Note. Redis keys is not necessary. You could skipping.

For testing, you could use the follow values for these keys: `AES_SECRET_KEY, RSA_PRIVATE_KEY, RSA_PUBLIC_KEY`
	

    AES_SECRET_KEY=cu4QWqe9uuhauNH9ExCo5ZIFmMH9bLThXwkDKdrInLHMkk71XjEmPScroicMX+EBIT4VI8vr9fLvFTHOgytbb/RMEJvqUDYg3TPEiyIkKhR5p7fL+FgrBHOvvfyP9VZ2fgXMWBQR0i6Dtr1sYAk9mB9ZwD6eupLpz3HbroKq0EBapuoMqiOVEQ5h4N1sB5qXsApA15hkiCbfH8y2RT6sNLMLDOr5oJ2e0h//6VSKTT2he9LU5wvDY8PhoAxnSImZWo/iwKOsQSBuYXBvU4rc/J5DfosJx6EV38oA5POAnjZbHFivKY4Ldtq127FyCcOsNREwpCJGk2V6JNmUDog36g==

    RSA_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdHYRzd0Er82ejzkAh7bQ/ObzKYLV/QdpJPNf5QqZoXaJN1Bu546x0NDJE6rpeD7O7Bw855TUHGvM1UlkoBPHHnWyag1mpxhLuqZKryrjy+yfBWhy82DrySpR+w4CMuOftuAedpaLC0An2dMvMVGhBL2/xRTNf3iLQ6OCAz43il3aiRfIcCY48SqI10aGYPUrSTfCS4RlnAHF0sGkrhgoZEVFqVIYZgJJG5RsZoJ5svxQS3vb9zAXr1uu5X7kWBbSEPtFbmWoBMyCnlG0qqcttIJ87Ptue8Gd9BglxoUgfc6+tIHF1jPuFKjuHZseeqkFNN+hrB+Lf3b3rk3u1WeOVAgMBAAECggEABNhdCVnvR+2Mb89Qbn6f9tNiWIP4rOYJI+xZ3ubr7oWB5LA95gxln235pXyIoHx2LWmBEg1Y7PE3+ItW0qArNZ2+9H/iLLuXqCw3qMKw0+6kK5DXS7wuV/wuGqYPfMEToLxylBPAbA1FQi6yMNWvvMZ7lDjvJedAWYMI/PS80/TaVJqv1rwfOTS9UJnk6rok6sgZFFAwlzF5gn1cnvV/ygQC4ATaog41SP1SuC2RBJlijvBlLwZnhoWGXFhZe7RHN11YhvnLc7nOpZDCZtJkNk9FEwYKyycZ2dAmPnHaoTq/fCWdyRdBPbxCkpLQFMsySXXdUnPs8srOUzuCfptnoQKBgQDOuD1GOAFgGUL5cSnqRKsfQ/bWUaw2NBFhGtBMzbsc0JG6iIC1ksJ0NP/GQdZjQMiOBKcTNF4BrB6zpbkRMbbTQEmRa7AT2Rw2Wzv8Z5fIoxvPDH70KMrziQMf6E2nF+CcA0PyJtJwEKp60afJDSSWySuq+RySF+aOyDQFvkvUIQKBgQDCkgEq1WAPhJZKL+85PVVNFnk4CFzH3cyUFTAHp1oWAtNERCYaeSVlfcVFWfedyuQ4JwNNGfWu3Ahjg75WxIAp1XPMGpuq0W+AzqWY789ZIaYx84SkEa5iuyTvH4joh117dHiY7ms1keK10ZU883a4ylDoiByNAKrb3M8IJ8vg9QKBgQDJb7MV18FPWY5v75v+kseFgf7oPVHox7gfvbc5AEjS/VLkR9vUE5y1DGgpU0KMGTbVXSdJiYAJdSW9vUGnxZ/4Hu8Ra7R6wtfBCApeHLxFYNvaWLzlQ1LxGZQX5ZC1wIi4vl3Ze4cYeMUHRYGQYuRCoumQg4sZuXyLqf83kYXmwQKBgBCnwuXRwhlR9jN/ivDRaT3iEJpVTOvm9p4ueiANmU6NC1yqoMBfYm4fqAVZwDKHraWI4WV2NWu0dhteqapvw7DRDsqH9I9Ywjy6c751uMAee0WHXPFWeiEFeBHoFyYggEYTIEenERJS3J9Hw4imJqGG4AonrJn9VqLfcfF2xqMJAoGBALDAM2a4RjK4UAEEMqs9VKTqqXQq32LBiUBY3EeTc/J3Lr+Z6OUUd/Kt2cgylYDH7jFsF2urJoRu+mYHHrnYaHC2YHAaah60hQ+pTk7/HJkk38XknXPEJwJ0fTecLi5hOjmAuqNhY7LmL8kA1HMwnVvR6j11qIorCNun8DCyZyRZ-----END PRIVATE KEY-----

    RSA_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnR2Ec3dBK/Nno85AIe20Pzm8ymC1f0HaSTzX+UKmaF2iTdQbueOsdDQyROq6Xg+zuwcPOeU1BxrzNVJZKATxx51smoNZqcYS7qmSq8q48vsnwVocvNg68kqUfsOAjLjn7bgHnaWiwtAJ9nTLzFRoQS9v8UUzX94i0OjggM+N4pd2okXyHAmOPEqiNdGhmD1K0k3wkuEZZwBxdLBpK4YKGRFRalSGGYCSRuUbGaCebL8UEt72/cwF69bruV+5FgW0hD7RW5lqATMgp5RtKqnLbSCfOz7bnvBnfQYJcaFIH3OvrSBxdYz7hSo7h2bHnqpBTTfoawfi392965N7tVnjlQIDAQAB-----END PUBLIC KEY-----





# Installation

1. Ensure all dependencies installed using `npm run install`
2. before to run it as first time, we recommend to you run the validation script using `npm run validate`	
3. Script for run it in **local environment** `npm run start:dev`
4. Script for **run the build** `npm run start`


# Documentation

Swagger documentation is available in **/api**
in local environment: http://localhost:3000/api

# More about it

 This project contains the follow technology.

 - Mongo
 - Github actions CI/CD
 - Deployment to Render
 - JWT
 - AES256 + RSA + CBC
 - Swagger
 - Crons
 - Swapi
 - Throttler limit rate
 - Interceptors
 - Guards

