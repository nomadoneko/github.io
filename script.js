document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  // ローカルストレージからタスクを読み込む
  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  }

  // タスクを追加
  function addTaskToDOM(text, completed = false) {
      const li = document.createElement("li");
      li.textContent = text;
      if (completed) li.classList.add("completed");

      // 完了ボタン
      const completeButton = document.createElement("button");
      completeButton.textContent = "✔";
      completeButton.addEventListener("click", function () {
          li.classList.toggle("completed");
          saveTasks();
      });

      // 削除ボタン
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", function () {
          li.remove();
          saveTasks();
      });

      li.appendChild(completeButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
      saveTasks();
  }

  // 入力欄からタスクを取得して追加
  addTaskButton.addEventListener("click", function () {
      if (taskInput.value.trim() !== "") {
          addTaskToDOM(taskInput.value);
          taskInput.value = "";
      }
  });

  // タスクをローカルストレージに保存
  function saveTasks() {
      const tasks = [];
      document.querySelectorAll("li").forEach(li => {
          tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed") });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // 初回ロード時にタスクを読み込む
  loadTasks();
});
