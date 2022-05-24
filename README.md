# ticketing

## Run

### Secrets setup

```sh
# /!\ Setup the value of the JWT_KEY
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<value>
```

### Run the app with Skaffold

```sh
skafflod dev
```
