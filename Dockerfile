# Node container to build project

FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# Go container to make a server build with frontend files
FROM golang:alpine AS goBuilder
WORKDIR /go/src/sdk
COPY /src/dist/applytics.js main.go ./
CMD ["ls"]  
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-w -s' -a -installsuffix cgo -o sdk

# Running go project in the smallest container available
FROM alpine:latest  AS sdk
RUN apk --no-cache add ca-certificates
WORKDIR /root/
EXPOSE 3000:3000
COPY --from=goBuilder /go/src/sdk/sdk ./
COPY --from=goBuilder /go/src/sdk/applytics.js  ./static/
CMD ["./sdk"]  
