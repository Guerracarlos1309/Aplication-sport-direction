import sequelize from "./config/database.js";
import Notification from "./models/Notification.js";

async function addTestNotifications() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database...");

    const testNotifs = [
      {
        title: "Nuevo Informe Médico",
        description:
          "El jugador Carlos Guerra tiene un nuevo diagnóstico: Apto.",
        type: "info",
        read: false,
      },
      {
        title: "Alerta de Carga",
        description: "Luca Modric ha superado el límite de carga semanal.",
        type: "warning",
        read: false,
      },
      {
        title: "Sesión Finalizada",
        description: "El entrenamiento táctico de hoy ha sido registrado.",
        type: "success",
        read: true,
      },
      {
        title: "Pago Vencido",
        description: "Hay un pago de material deportivo pendiente de revisión.",
        type: "danger",
        read: false,
      },
    ];

    for (const n of testNotifs) {
      await Notification.create(n);
    }

    console.log("Test notifications added successfully!");
  } catch (error) {
    console.error("Error adding notifications:", error);
  } finally {
    await sequelize.close();
  }
}

addTestNotifications();
