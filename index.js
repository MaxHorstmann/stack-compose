var components = [
  {
    name : "mssql",
    group: "Data stores (SQL)",
    image: "microsoft/mssql-server-linux",
    tags: ["latest"],
    ports: ["1433:1433"],
    environment: ["ACCEPT_EULA=Y", "MSSQL_PID=Express", "SA_PASSWORD=Password123!"],
  },

  {
    name : "postgres",
    group: "Data stores (SQL)",
    image: "postgres",
    tags: ["latest"],
    ports: ["5432:5432"],
    environment: ["POSTGRES_PASSWORD=Password123!"],
  },

  {
    name : "dotnet",
    group: "Dev/Build",
    image: "mcr.microsoft.com/dotnet/core/sdk",
    tags: ["latest"],
    //ports: ["8000:80"],
    volumes: "./src:/usr/src",
    stdin_open: true,
    tty: true,
    working_dir: "/usr/src"
  }

]

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    components: components
  }
})