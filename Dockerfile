
FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

#copy src/dist/applytics.js
#make executable

FROM golang:alpine AS goBuilder
WORKDIR /go/src/sdk
COPY /src/dist/applytics.js main.go ./
CMD ["ls"]  
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-w -s' -a -installsuffix cgo -o sdk

# Running project with the build
FROM alpine:latest  AS sdk
RUN apk --no-cache add ca-certificates
WORKDIR /root/
EXPOSE 3000:3000
COPY --from=goBuilder /go/src/sdk/sdk ./
COPY --from=goBuilder /go/src/sdk/applytics.js  ./static/
CMD ["./sdk"]  
