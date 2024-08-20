document.addEventListener("DOMContentLoaded", () => {
  const userNameShow = document.getElementById("userNameShow");
  const userNameInput = document.getElementById("userNameInput");
  const welcomeModal = document.getElementById("welcomeModal");
  let submitBtn = document.getElementById("submitBtn");
  let storedNames = JSON.parse(localStorage.getItem("userNames")) || [];


  function checkUserName() {
    if (storedNames.length > 0) {
      userNameShow.innerText = storedNames[storedNames.length - 1];
    } else {
      welcomeModal.classList.remove("hidden");
      submitBtn.addEventListener("click", () => {
        const userName = userNameInput.value;
        if (userName) {
          storedNames.push(userName);
          localStorage.setItem("userNames", JSON.stringify(storedNames));
          userNameShow.innerText = userName;
          welcomeModal.classList.add("hidden");
        }
      });
    }
  }
  checkUserName();

  userNameShow.addEventListener("click", () => {
    console.log(storedNames.length = 0);
    checkUserName();
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const addTaskButtons = document.querySelectorAll(".add-task-btn");
  const taskModal = document.getElementById("task-modal");
  const cancelButton = document.getElementById("cancel-btn");
  const saveDataButton = document.getElementById("save-data");
  const taskForm = document.getElementById("task-form");
  const taskTitleInput = document.getElementById("task-title");
  const taskDescriptionInput = document.getElementById("task-description");
  const completionDateInput = document.getElementById("completion-date");

  let allTasks = [];
  let currentContainer = null;

  // Function to open the modal for adding a new task
  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentContainer = button.closest(".swiper-slide").querySelector(".flex-wrap");
      taskModal.classList.remove("hidden");
      taskForm.reset(); // Clear the form
      taskForm.setAttribute("data-mode", "add"); // Set mode to add
      taskForm.removeAttribute("data-task-id"); // Remove any task ID
    });
  });

  // Function to close the modal
  cancelButton.addEventListener("click", () => {
    taskModal.classList.add("hidden");
  });

  // Function to calculate relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365.25);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  };

  // Function to calculate time left until the completion date
  const getTimeLeft = (completionDate) => {
    const now = new Date();
    const diff = new Date(completionDate) - now;

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} left`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
    } else {
      return "Time's Up";
    }
  };

  // Function to update the relative time of all tasks
  const updateRelativeTimes = () => {
    const updateTime = (span, getTimeFunc, attr) => {
      const date = new Date(span.getAttribute(attr));
      span.textContent = getTimeFunc(date);
    };

    document.querySelectorAll(".task-created-time")
      .forEach((span) => updateTime(span, getRelativeTime, "data-created-time"));

    document
      .querySelectorAll(".task-time-left")
      .forEach((span) => updateTime(span, getTimeLeft, "data-completion-date"));
  };

  // Function to create a new task div
  const createTaskDiv = (id, title, description, completionDate, createdTime, containerId) => {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "task editTask relative px-4 py-3 w-full rounded-xl border border-gray-300 flex flex-col bg-secondary";
    taskDiv.setAttribute("data-task-id", id);

    // Top div with created time and time left (if provided)
    const topDiv = document.createElement("div");
    topDiv.className = "flex justify-between mb-1";

    const createdTimeSpan = document.createElement("span");
    createdTimeSpan.className =
      "task-created-time text-light text-sm rounded-2xl  leading-tight";
    createdTimeSpan.setAttribute("data-created-time", createdTime.toISOString());
    createdTimeSpan.textContent = getRelativeTime(new Date(createdTime));

    const createdTimeDiv = document.createElement("div");
    createdTimeDiv.appendChild(createdTimeSpan);
    topDiv.appendChild(createdTimeDiv);

    if (completionDate) {
      const timeLeftSpan = document.createElement("span");
      timeLeftSpan.className =
        "task-time-left text-light text-sm rounded-2xl  leading-tight";
      timeLeftSpan.setAttribute("data-completion-date", completionDate);
      timeLeftSpan.textContent = getTimeLeft(completionDate);

      const timeLeftDiv = document.createElement("div");
      timeLeftDiv.appendChild(timeLeftSpan);
      topDiv.appendChild(timeLeftDiv);
    }

    taskDiv.appendChild(topDiv);

    // Middle div with title and description (if provided)
    if (title) {
      const titleDiv = document.createElement("div");
      titleDiv.className =
        "break-all leading-tight flex justify-between items-center relative rounded-2xl";

      const titleH3 = document.createElement("h3");
      titleH3.className =
        "text-lg md:text-lg font-semibold text-bright line-clamp-1";
      titleH3.title = title;
      titleH3.textContent = title;

      titleDiv.appendChild(titleH3);
      taskDiv.appendChild(titleDiv);
    }

    if (description) {
      const descriptionDiv = document.createElement("div");
      descriptionDiv.className =
        "break-all flex justify-between items-center relative rounded-2xl";

      const descriptionH3 = document.createElement("h3");
      descriptionH3.className = "text-sm md:text-base text-light line-clamp-4";
      descriptionH3.title = description;
      descriptionH3.textContent = description;

      descriptionDiv.appendChild(descriptionH3);
      taskDiv.appendChild(descriptionDiv);
    }

    // Event listener for editing the task
    taskDiv.addEventListener("click", () => {
      const taskId = taskDiv.getAttribute("data-task-id");
      const task = allTasks.find(task => task.id === taskId);

      if (task) {
        taskTitleInput.value = task.title;
        taskDescriptionInput.value = task.description;
        completionDateInput.value = task.completionDate;
        taskForm.setAttribute("data-mode", "edit");
        taskForm.setAttribute("data-task-id", taskId);
        currentContainer = taskDiv.parentNode; // Set the current container for editing
        taskModal.classList.remove("hidden");
      }
    });

    // Add task to the specified container
    const container = document.getElementById(containerId);
    if (container) {
      container.appendChild(taskDiv);
    }

    return taskDiv;
  };

  // Event listener for the "Save" button
  saveDataButton.addEventListener("click", (e) => {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const completionDate = completionDateInput.value.trim();
    const mode = taskForm.getAttribute("data-mode");
    const taskId = taskForm.getAttribute("data-task-id");

    if (title || description || completionDate) {
      const createdTime = mode === "edit" && taskId ? allTasks.find(task => task.id === taskId).createdTime : new Date();

      if (mode === "edit" && taskId) {
        const taskIndex = allTasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          allTasks[taskIndex] = {
            id: taskId,
            title,
            description,
            completionDate,
            createdTime,
            containerId: allTasks[taskIndex].containerId // Preserve original container ID
          };

          const taskDiv = createTaskDiv(taskId, title, description, completionDate, new Date(allTasks[taskIndex].createdTime), allTasks[taskIndex].containerId);
          const oldTaskDiv = document.querySelector(`[data-task-id="${taskId}"]`);
          oldTaskDiv.parentNode.replaceChild(taskDiv, oldTaskDiv);
        }
      } else {
        const id = `${Date.now()}`;
        allTasks.push({ id, title, description, completionDate, createdTime, containerId: currentContainer.id });
        createTaskDiv(id, title, description, completionDate, createdTime, currentContainer.id);
      }

      localStorage.setItem("tasks", JSON.stringify(allTasks));

      taskModal.classList.add("hidden");
    }
  });

  // Function to load tasks from local storage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks && Array.isArray(tasks)) {
      allTasks = tasks;
      tasks.forEach((task) => {
        createTaskDiv(
          task.id,
          task.title,
          task.description,
          task.completionDate,
          new Date(task.createdTime),
          task.containerId
        );
      });
    }
  };

  loadTasks();
  updateRelativeTimes();
  setInterval(updateRelativeTimes, 60 * 1000); // Update relative times every minute
});














// this is for daily tasks
document.addEventListener("DOMContentLoaded", () => {
  const addDailyTaskButton = document.querySelector(".add-daily-task-btn");
  const dailyTaskModal = document.getElementById("daily-task-modal");
  const dailyCancelButton = document.getElementById("daily-cancel-btn");
  const dailySaveDataButton = document.getElementById("daily-save-data");
  const dailyTaskForm = document.getElementById("daily-task-form");
  const dailyTaskDescriptionInput = document.getElementById("daily-task-description");
  const dailyTaskTimeInput = document.getElementById("daily-task-time");
  const dailyTaskContainer = document.getElementById("daily-task-container");

  let isEditing = false;
  let currentTaskDiv = null;

  const checkedClass = "text-green-600";
  const opacityClass = "opacity-50";

  addDailyTaskButton.addEventListener("click", () => {
    dailyTaskModal.classList.remove("hidden");
    dailyTaskForm.reset();
    isEditing = false;
  });

  dailyCancelButton.addEventListener("click", () => {
    dailyTaskModal.classList.add("hidden");
  });

  const createDailyTaskDiv = (description, time) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task border border-gray-200 px-2 bg-pr rounded-xl  bg-secondary";

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex items-center gap-2 relative rounded-2xl";

    const checkedButton = document.createElement("i");
    checkedButton.className = "fa-regular fa-circle-check checkedGreen text-lightest";

    const editButton = document.createElement("button");
    editButton.className = "edit-daily-task-btn w-full text-left py-2";

    const taskDescription = document.createElement("h3");
    taskDescription.className = "break-all text-sm font-medium text-light line-clamp-2";
    taskDescription.title = description;
    taskDescription.textContent = description;

    const timeSpan = document.createElement("span");
    if (time) {
      timeSpan.className = "text-light text-sm bg-[#fcfcfcae] rounded-2xl absolute top-[-10px] px-1 right-2";
      timeSpan.textContent = time;
    }

    editButton.appendChild(taskDescription);
    if (time) editButton.appendChild(timeSpan);
    flexDiv.appendChild(checkedButton);
    flexDiv.appendChild(editButton);
    taskDiv.appendChild(flexDiv);

    checkedButton.addEventListener("click", () => {
      const isChecked = checkedButton.classList.toggle(checkedClass);
      taskDiv.classList.toggle(opacityClass, isChecked);
      saveDailyTasksToLocalStorage();
    });

    editButton.addEventListener("click", () => {
      const latestDescription = taskDescription.textContent;
      const latestTime = timeSpan ? timeSpan.textContent : "";

      dailyTaskDescriptionInput.value = latestDescription;
      dailyTaskTimeInput.value = latestTime ? convertTo24HourFormat(latestTime) : "";

      dailyTaskModal.classList.remove("hidden");
      isEditing = true;
      currentTaskDiv = taskDiv;
    });

    return taskDiv;
  };

  dailySaveDataButton.addEventListener("click", (e) => {
    e.preventDefault();

    const description = dailyTaskDescriptionInput.value.trim();
    const time = dailyTaskTimeInput.value.trim();

    if (description) {
      if (isEditing && currentTaskDiv) {
        currentTaskDiv.querySelector("h3").textContent = description;
        const timeSpan = currentTaskDiv.querySelector("span");
        if (time) {
          const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          if (timeSpan) {
            timeSpan.textContent = formattedTime;
          } else {
            const newTimeSpan = document.createElement("span");
            newTimeSpan.className = "text-light text-sm bg-primary rounded-2xl absolute top-[-10px] px-1 right-2";
            newTimeSpan.textContent = formattedTime;
            currentTaskDiv.querySelector(".edit-daily-task-btn").appendChild(newTimeSpan);
          }
        }
      } else {
        const formattedTime = time ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : "";
        const newTaskDiv = createDailyTaskDiv(description, formattedTime);
        dailyTaskContainer.appendChild(newTaskDiv);
      }
      saveDailyTasksToLocalStorage();
    } else if (isEditing && currentTaskDiv) {
      currentTaskDiv.remove();
      saveDailyTasksToLocalStorage();
    }

    dailyTaskForm.reset();
    dailyTaskModal.classList.add("hidden");
  });

  const resetTasks = () => {
    const taskDivs = dailyTaskContainer.querySelectorAll(".border");
    taskDivs.forEach((taskDiv) => {
      const checkedButton = taskDiv.querySelector(".checkedGreen");
      checkedButton.classList.remove(checkedClass);
      taskDiv.classList.remove(opacityClass);
    });
  };

  function saveDailyTasksToLocalStorage() {
    const tasks = [];

    dailyTaskContainer.querySelectorAll(".border").forEach((taskDiv) => {
      const taskDescription = taskDiv.querySelector("h3");
      if (taskDescription) {
        const description = taskDescription.textContent;
        const timeSpan = taskDiv.querySelector("span");
        const time = timeSpan ? timeSpan.textContent : "";
        tasks.push({
          description,
          time,
        });
      }
    });

    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

    tasks.forEach((task) => {
      const newTaskDiv = createDailyTaskDiv(task.description, task.time);
      dailyTaskContainer.appendChild(newTaskDiv);
    });
  }

  function convertTo24HourFormat(time) {
    const [hours, minutes] = time.split(/[: ]/);
    const ampm = time.split(' ')[1];
    let hours24 = parseInt(hours, 10);
    if (ampm.toLowerCase() === 'pm' && hours24 !== 12) {
      hours24 += 12;
    } else if (ampm.toLowerCase() === 'am' && hours24 === 12) {
      hours24 = 0;
    }
    return `${hours24.toString().padStart(2, '0')}:${minutes}`;
  }

  const initializePage = () => {
    resetTasks();
    loadTasksFromLocalStorage();
  };

  initializePage();
});
















//seaech
document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    filterTasks(query);
});

function filterTasks(query) {
    // Get all task containers
    const taskContainers = document.querySelectorAll('#todo-tasks-container, #inprogress-tasks-container, #planes-tasks-container, #daily-task-container, #ideas-task-container');

    taskContainers.forEach(container => {
        const tasks = container.querySelectorAll('.task');
        tasks.forEach(task => {
            const taskText = task.innerText.toLowerCase();
            if (taskText.includes(query)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });
}
