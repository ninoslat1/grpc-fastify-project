import { Application } from "./src/Application";

const app = new Application();

async function main() {
  try {
    await app.start();
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await app.shutdown();
  process.exit(0);
});

main();