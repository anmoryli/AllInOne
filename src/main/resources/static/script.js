/* 全局变量 */
let currentUser = null
let isLoggedIn = false
let currentPreviewItem = null
let isSidebarCollapsed = false
let currentSwapType = "imgSwap" // 默认为图片换脸
const srcFileUrl = null
const dstFileUrl = null

/* 文件服务器地址 */
const FILE_SERVER_URL = "http://anmory.com:96"

/* 心灵伴侣聊天历史 */
const heartChatHistory = []

/* AI工具数据 */
const aiTools = {
  text: [
    {
      name: "ChatGPT",
      description: "强大的AI对话助手，支持文本生成、翻译、总结等多种功能",
      url: "https://chat.openai.com",
    },
    { name: "Claude", description: "Anthropic开发的AI助手，擅长分析和写作，提供深度思考", url: "https://claude.ai" },
    { name: "文心一言", description: "百度推出的AI对话系统，支持中文对话和创作", url: "https://yiyan.baidu.com" },
    { name: "通义千问", description: "阿里巴巴的大语言模型，提供智能问答服务", url: "https://tongyi.aliyun.com" },
    { name: "Grammarly", description: "英文语法检查和写作助手，提升写作质量", url: "https://grammarly.com" },
    { name: "DeepL", description: "高质量的AI翻译工具，支持多种语言互译", url: "https://deepl.com" },
    { name: "Notion AI", description: "Notion内置的AI写作助手，提升文档创作效率", url: "https://notion.so" },
    { name: "Jasper", description: "专业的AI内容创作平台，适合营销文案写作", url: "https://jasper.ai" },
  ],
  image: [
    { name: "Midjourney", description: "顶级AI图像生成工具，创作艺术级别的图像", url: "https://midjourney.com" },
    { name: "DALL-E 3", description: "OpenAI的图像生成模型，理解复杂文本描述", url: "https://openai.com/dall-e-3" },
    { name: "Stable Diffusion", description: "开源的AI图像生成模型，自由度高", url: "https://stability.ai" },
    { name: "Adobe Firefly", description: "Adobe的AI创意工具套件，集成专业设计功能", url: "https://firefly.adobe.com" },
    { name: "Canva AI", description: "Canva的AI设计助手，快速生成设计作品", url: "https://canva.com" },
    { name: "Remove.bg", description: "AI背景移除工具，一键抠图去背景", url: "https://remove.bg" },
    { name: "Upscale.media", description: "AI图像放大工具，提升图片分辨率", url: "https://upscale.media" },
    { name: "Leonardo AI", description: "专业的AI艺术创作平台，多种风格选择", url: "https://leonardo.ai" },
  ],
  video: [
    { name: "Runway ML", description: "AI视频生成和编辑平台，支持文本生成视频", url: "https://runwayml.com" },
    { name: "Pika Labs", description: "AI视频生成工具，轻松创建动态视频内容", url: "https://pika.art" },
    { name: "Stable Video", description: "Stability AI的视频生成工具，高质量视频制作", url: "https://stability.ai" },
    { name: "Synthesia", description: "AI虚拟人视频制作平台，快速生成演示视频", url: "https://synthesia.io" },
    { name: "Luma AI", description: "3D视频捕捉和生成，创建沉浸式视频体验", url: "https://lumalabs.ai" },
    { name: "Pictory", description: "AI视频编辑和制作工具，自动生成视频摘要", url: "https://pictory.ai" },
    { name: "InVideo", description: "在线视频编辑平台，AI辅助视频制作", url: "https://invideo.io" },
    { name: "Fliki", description: "文本转视频AI工具，支持多语言配音", url: "https://fliki.ai" },
  ],
  code: [
    {
      name: "GitHub Copilot",
      description: "GitHub的AI编程助手，智能代码补全和生成",
      url: "https://github.com/features/copilot",
    },
    { name: "Cursor", description: "AI驱动的代码编辑器，提升编程效率", url: "https://cursor.sh" },
    { name: "Tabnine", description: "AI代码补全工具，支持多种编程语言", url: "https://tabnine.com" },
    { name: "Replit AI", description: "Replit的AI编程助手，在线编程环境", url: "https://replit.com" },
    { name: "Codeium", description: "免费的AI代码助手，智能代码生成", url: "https://codeium.com" },
    {
      name: "Amazon CodeWhisperer",
      description: "AWS的AI代码生成工具，企业级解决方案",
      url: "https://aws.amazon.com/codewhisperer",
    },
    { name: "Sourcegraph Cody", description: "AI代码助手，理解整个代码库上下文", url: "https://sourcegraph.com/cody" },
    { name: "Blackbox AI", description: "AI编程助手，支持代码搜索和生成", url: "https://blackbox.ai" },
  ],
}

/* DOM元素 */
const elements = {
  // 导航和菜单
  menuToggle: document.getElementById("menu-toggle"),
  sidebar: document.getElementById("sidebar"),
  mainContent: document.getElementById("main-content"),
  navItems: document.querySelectorAll(".nav-item"),
  sections: document.querySelectorAll(".content-section"),

  // 主题切换
  themeToggle: document.getElementById("theme-toggle"),

  // 用户相关
  userProfile: document.getElementById("user-profile"),
  userAvatar: document.getElementById("user-avatar"),
  userDropdown: document.getElementById("user-dropdown"),
  userName: document.getElementById("user-name"),
  userEmail: document.getElementById("user-email"),
  dropdownAvatar: document.getElementById("dropdown-avatar"),
  logoutBtn: document.getElementById("logout-btn"),
  profileSettings: document.getElementById("profile-settings"),
  uploadAvatar: document.getElementById("upload-avatar"),

  // 搜索
  globalSearch: document.getElementById("global-search"),

  // 模态框
  authModal: document.getElementById("auth-modal"),
  fileUploadModal: document.getElementById("file-upload-modal"),
  photoUploadModal: document.getElementById("photo-upload-modal"),
  avatarUploadModal: document.getElementById("avatar-upload-modal"),
  previewModal: document.getElementById("preview-modal"),
  formModal: document.getElementById("form-modal"),

  // 表单
  authForm: document.getElementById("auth-form"),
  fileUploadForm: document.getElementById("file-upload-form"),
  photoUploadForm: document.getElementById("photo-upload-form"),
  avatarUploadForm: document.getElementById("avatar-upload-form"),

  // 内容区域
  filesContainer: document.getElementById("files-container"),
  photosGrid: document.getElementById("photos-grid"),
  todosList: document.getElementById("todos-list"),
  newTodoInput: document.getElementById("new-todo-input"),
  addTodoBtn: document.getElementById("add-todo-btn"),

  // 统计数据
  filesCount: document.getElementById("files-count"),
  photosCount: document.getElementById("photos-count"),
  pendingTodosCount: document.getElementById("pending-todos-count"),
  faceSwapCount: document.getElementById("face-swap-count"),
  filesNavCount: document.getElementById("files-nav-count"),
  photosNavCount: document.getElementById("photos-nav-count"),
  todosNavCount: document.getElementById("todos-nav-count"),
  faceSwapNavCount: document.getElementById("face-swap-nav-count"),
  totalTodos: document.getElementById("total-todos"),
  pendingTodos: document.getElementById("pending-todos"),
  completedTodos: document.getElementById("completed-todos"),

  // 预览相关
  previewContainer: document.getElementById("preview-container"),
  previewTitle: document.getElementById("preview-title"),
  previewInfo: document.getElementById("preview-info"),
  previewDownload: document.getElementById("preview-download"),
  previewCopyLink: document.getElementById("preview-copy-link"),
  previewDelete: document.getElementById("preview-delete"),

  // 文件上传相关
  fileCategorySelect: document.getElementById("file-category-select"),
  fileCategoryInput: document.getElementById("file-category-input"),

  // 设置相关
  settingsAvatar: document.getElementById("settings-avatar"),
  settingsUsername: document.getElementById("settings-username"),
  settingsEmail: document.getElementById("settings-email"),
  settingsPhone: document.getElementById("settings-phone"),
  changeAvatarBtn: document.getElementById("change-avatar-btn"),
  bindEmailBtn: document.getElementById("bind-email-btn"),
  bindPhoneBtn: document.getElementById("bind-phone-btn"),
  changePasswordBtn: document.getElementById("change-password-btn"),
  deleteAccountBtn: document.getElementById("delete-account-btn"),

  // AI换脸相关
  newFaceSwapBtn: document.getElementById("new-face-swap-btn"),
  typeOptions: document.querySelectorAll(".type-option"),
  srcFileInput: document.getElementById("src-file-input"),
  srcUploadBtn: document.getElementById("src-upload-btn"),
  srcUrlInput: document.getElementById("src-url-input"),
  srcUrlBtn: document.getElementById("src-url-btn"),
  srcPreview: document.getElementById("src-preview"),
  dstFileInput: document.getElementById("dst-file-input"),
  dstUploadBtn: document.getElementById("dst-upload-btn"),
  dstUrlInput: document.getElementById("dst-url-input"),
  dstUrlBtn: document.getElementById("dst-url-btn"),
  dstPreview: document.getElementById("dst-preview"),
  startSwapBtn: document.getElementById("start-swap-btn"),
  resetSwapBtn: document.getElementById("reset-swap-btn"),
  refreshHistoryBtn: document.getElementById("refresh-history-btn"),
  faceSwapHistoryList: document.getElementById("face-swap-history-list"),

  // 心灵伴侣相关
  heartSection: document.getElementById("heart-section"),
  heartChatHistory: document.getElementById("heart-chat-history"),
  heartChatInput: document.getElementById("heart-chat-input"),
  heartSendBtn: document.getElementById("heart-send-btn"),
  clearHeartChat: document.getElementById("clear-heart-chat"),
  downloadHeartChat: document.getElementById("download-heart-chat"),

  // 工具
  loading: document.getElementById("loading"),
  loadingText: document.getElementById("loading-text"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toast-message"),
  toastIcon: document.getElementById("toast-icon"),
  toastClose: document.getElementById("toast-close"),
}

/* 初始化 */
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadAITools()
  checkLoginStatus()
  updateFileAcceptTypes() // 初始化文件接受类型
  setupHeartChatEventListeners() // 初始化心灵伴侣事件监听
})

function loadSettingUserInfo() {
  if (currentUser) {
    console.log("[loadSettingUserInfo]currentUser:", currentUser)
    elements.settingsUsername.value = currentUser.username
    elements.settingsEmail.value = currentUser.email || ""
    elements.settingsPhone.value = currentUser.phone || ""
  }
}

function jump() {
  window.open("https://ai-bot.cn/", "_blank")
}

function initializeApp() {
  // 检查主题设置
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)

  // 检查侧边栏状态
  const sidebarState = localStorage.getItem("sidebarCollapsed")
  if (sidebarState === "true") {
    elements.sidebar.classList.add("collapsed")
    isSidebarCollapsed = true
  }
}

function setupEventListeners() {
  // 菜单切换
  elements.menuToggle.addEventListener("click", toggleSidebar)

  // 导航切换
  elements.navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const section = item.dataset.section
      switchSection(section)

      // 更新导航状态
      elements.navItems.forEach((nav) => nav.classList.remove("active"))
      item.classList.add("active")
    })
  })

  // 仪表板卡片点击
  document.querySelectorAll(".dashboard-card").forEach((card) => {
    card.addEventListener("click", () => {
      const section = card.dataset.section
      if (section) {
        switchSection(section)
        // 更新导航状态
        elements.navItems.forEach((nav) => nav.classList.remove("active"))
        document.querySelector(`[data-section="${section}"]`).classList.add("active")
      }
    })
  })

  // 主题切换
  elements.themeToggle.addEventListener("click", toggleTheme)

  // 用户菜单
  elements.userProfile.addEventListener("click", toggleUserMenu)
  elements.profileSettings.addEventListener("click", () => {
    switchSection("settings")
    hideUserMenu()
    // 更新导航状态
    elements.navItems.forEach((nav) => nav.classList.remove("active"))
    document.querySelector('[data-section="settings"]').classList.add("active")
  })
  elements.uploadAvatar.addEventListener("click", () => {
    showModal("avatar-upload-modal")
    hideUserMenu()
  })
  elements.logoutBtn.addEventListener("click", logout)

  // 模态框关闭
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal-overlay")
      hideModal(modal.id)
    })
  })

  // 点击模态框外部关闭
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideModal(modal.id)
      }
    })
  })

  // 认证表单
  elements.authForm.addEventListener("submit", handleAuth)
  document.getElementById("auth-switch-btn").addEventListener("click", switchAuthMode)

  // 文件上传
  document.getElementById("upload-file-btn").addEventListener("click", () => {
    if (!isLoggedIn) {
      showAuthModal()
      return
    }
    loadFileCategories()
    showModal("file-upload-modal")
  })
  elements.fileUploadForm.addEventListener("submit", handleFileUpload)

  // 文件分类输入切换
  elements.fileCategorySelect.addEventListener("change", (e) => {
    if (e.target.value) {
      elements.fileCategoryInput.value = ""
      elements.fileCategoryInput.disabled = true
    } else {
      elements.fileCategoryInput.disabled = false
    }
  })

  elements.fileCategoryInput.addEventListener("input", (e) => {
    if (e.target.value) {
      elements.fileCategorySelect.value = ""
    }
  })

  // 照片上传
  document.getElementById("upload-photo-btn").addEventListener("click", () => {
    if (!isLoggedIn) {
      showAuthModal()
      return
    }
    showModal("photo-upload-modal")
  })
  elements.photoUploadForm.addEventListener("submit", handlePhotoUpload)

  // 头像上传
  elements.avatarUploadForm.addEventListener("submit", handleAvatarUpload)

  // 待办事项
  elements.addTodoBtn.addEventListener("click", addTodo)
  elements.newTodoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  })

  // 预览操作
  elements.previewDownload.addEventListener("click", downloadCurrentPreview)
  elements.previewCopyLink.addEventListener("click", copyCurrentPreviewLink)
  elements.previewDelete.addEventListener("click", deleteCurrentPreview)

  // 设置按钮
  elements.changeAvatarBtn.addEventListener("click", () => showModal("avatar-upload-modal"))
  elements.bindEmailBtn.addEventListener("click", () => showFormModal("绑定邮箱", createBindEmailForm()))
  elements.bindPhoneBtn.addEventListener("click", () => showFormModal("绑定手机", createBindPhoneForm()))
  elements.changePasswordBtn.addEventListener("click", () => showFormModal("修改密码", createChangePasswordForm()))
  elements.deleteAccountBtn.addEventListener("click", confirmDeleteAccount)

  // AI换脸相关事件监听
  setupFaceSwapEventListeners()

  // Toast关闭
  elements.toastClose.addEventListener("click", hideToast)

  // 点击其他地方关闭用户菜单
  document.addEventListener("click", (e) => {
    if (!elements.userProfile.contains(e.target)) {
      hideUserMenu()
    }
  })

  // 搜索功能
  elements.globalSearch.addEventListener("input", debounce(handleGlobalSearch, 300))

  // 键盘快捷键
  document.addEventListener("keydown", handleKeyboardShortcuts)
}

/* 心灵伴侣功能 */
function setupHeartChatEventListeners() {
  // 发送按钮点击
  if (elements.heartSendBtn) {
    elements.heartSendBtn.addEventListener("click", sendHeartMessage)
  }

  // 输入框事件
  if (elements.heartChatInput) {
    elements.heartChatInput.addEventListener("input", handleHeartInputChange)
    elements.heartChatInput.addEventListener("keydown", handleHeartInputKeydown)
  }

  // 清空聊天记录
  if (elements.clearHeartChat) {
    elements.clearHeartChat.addEventListener("click", clearHeartChatHistory)
  }

  // 下载聊天记录
  if (elements.downloadHeartChat) {
    elements.downloadHeartChat.addEventListener("click", downloadHeartChatHistory)
  }
}

function handleHeartInputChange() {
  const input = elements.heartChatInput
  const sendBtn = elements.heartSendBtn
  const charCount = document.querySelector(".char-count")

  if (input && sendBtn) {
    const text = input.value.trim()
    sendBtn.disabled = text.length === 0

    // 更新字符计数
    if (charCount) {
      charCount.textContent = `${input.value.length}/1000`
    }

    // 自动调整输入框高度
    input.style.height = "auto"
    input.style.height = Math.min(input.scrollHeight, 120) + "px"
  }
}

function handleHeartInputKeydown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    sendHeartMessage()
  }
}

async function sendHeartMessage() {
  const input = elements.heartChatInput
  const message = input.value.trim()

  if (!message || !isLoggedIn) {
    if (!isLoggedIn) {
      showAuthModal()
    }
    return
  }

  // 添加用户消息到界面
  addMessageToChat(message, "user")

  // 清空输入框
  input.value = ""
  input.style.height = "auto"
  elements.heartSendBtn.disabled = true
  document.querySelector(".char-count").textContent = "0/1000"

  // 显示AI正在输入的提示
  showTypingIndicator()

  try {
    // 调用后端API
    const response = await fetch("/heart/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `query=${encodeURIComponent(message)}`,
    })

    if (response.ok) {
      const aiResponse = await response.text()

      // 移除输入提示
      hideTypingIndicator()

      // 添加AI回复到界面
      addMessageToChat(aiResponse, "ai")

      // 保存聊天记录到数据库
      await saveHeartChatToDatabase(message, aiResponse)
    } else {
      hideTypingIndicator()
      addMessageToChat("抱歉，我现在无法回复。请稍后再试。", "ai")
      showToast("发送消息失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Heart chat error:", error)
    hideTypingIndicator()
    addMessageToChat("抱歉，出现了一些问题。请稍后再试。", "ai")
    showToast("发送消息失败，请稍后重试", "error")
  }
}

function addMessageToChat(message, sender) {
  const chatHistory = elements.heartChatHistory
  if (!chatHistory) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `message-bubble ${sender}-message`

  const now = new Date()
  const timeString = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  })

  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${escapeHtml(message)}</p>
    </div>
    <div class="message-time">${timeString}</div>
  `

  chatHistory.appendChild(messageDiv)

  // 滚动到底部
  chatHistory.scrollTop = chatHistory.scrollHeight
}

function showTypingIndicator() {
  const chatHistory = elements.heartChatHistory
  if (!chatHistory) return

  const typingDiv = document.createElement("div")
  typingDiv.className = "typing-indicator"
  typingDiv.id = "typing-indicator"
  typingDiv.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `

  chatHistory.appendChild(typingDiv)
  chatHistory.scrollTop = chatHistory.scrollHeight
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

// 保存聊天记录到数据库
async function saveHeartChatToDatabase(userMessage, aiResponse) {
  if (!currentUser) return

  try {
    const formData = new FormData()
    formData.append("query", userMessage)
    formData.append("content", aiResponse)
    formData.append("userId", currentUser.userId)

    const response = await fetch("/ai/insert", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        console.log("聊天记录已保存到数据库")
      } else {
        console.error("保存聊天记录失败")
      }
    } else {
      console.error("保存聊天记录失败，HTTP状态码:", response.status)
    }
  } catch (error) {
    console.error("保存聊天记录失败:", error)
  }
}

// 从数据库加载聊天历史
async function loadHeartChatHistory() {
  if (!isLoggedIn || !currentUser) return

  try {
    const response = await fetch(`/ai/selectByUserId?userId=${currentUser.userId}`)
    if (response.ok) {
      const chatRecords = await response.json()
      if (Array.isArray(chatRecords)) {
        // 按创建时间排序
        const sortedRecords = chatRecords.sort((a, b) => new Date(a.createAt) - new Date(b.createAt))

        // 清空当前聊天界面（保留欢迎消息）
        const chatHistory = elements.heartChatHistory
        if (chatHistory) {
          chatHistory.innerHTML = `
            <div class="welcome-message">
              <div class="message-bubble ai-message">
                <div class="message-content">
                  <p>你好！我是你的心灵伴侣，很高兴见到你。无论你想分享什么，我都会认真倾听。有什么想聊的吗？</p>
                </div>
                <div class="message-time">刚刚</div>
              </div>
            </div>
          `
        }

        // 重新显示历史聊天记录
        sortedRecords.forEach((record) => {
          addHistoryMessageToChat(record.query, "user", record.createAt)
          addHistoryMessageToChat(record.content, "ai", record.createAt)
        })

        // 滚动到底部
        if (chatHistory) {
          chatHistory.scrollTop = chatHistory.scrollHeight
        }
      }
    }
  } catch (error) {
    console.error("加载聊天历史失败:", error)
  }
}

// 添加历史消息到聊天界面
function addHistoryMessageToChat(message, sender, createTime) {
  const chatHistory = elements.heartChatHistory
  if (!chatHistory) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `message-bubble ${sender}-message`

  // 格式化时间
  const time = new Date(createTime)
  const timeString = time.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  })

  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${escapeHtml(message)}</p>
    </div>
    <div class="message-time">${timeString}</div>
  `

  chatHistory.appendChild(messageDiv)
}

async function clearHeartChatHistory() {
  if (!confirm("确定要清空所有聊天记录吗？此操作不可撤销。")) {
    return
  }

  // 清空界面
  const chatHistory = elements.heartChatHistory
  if (chatHistory) {
    // 保留欢迎消息
    chatHistory.innerHTML = `
      <div class="welcome-message">
        <div class="message-bubble ai-message">
          <div class="message-content">
            <p>你好！我是你的心灵伴侣，很高兴见到你。无论你想分享什么，我都会认真倾听。有什么想聊的吗？</p>
          </div>
          <div class="message-time">刚刚</div>
        </div>
      </div>
    `
  }

  // 注意：这里没有删除数据库记录的API，如果需要可以添加
  // 目前只是清空界面显示
  showToast("聊天记录已清空（界面显示）", "success")
}

async function downloadHeartChatHistory() {
  if (!isLoggedIn || !currentUser) {
    showToast("请先登录", "warning")
    return
  }

  try {
    // 从数据库获取聊天记录
    const response = await fetch(`/ai/selectByUserId?userId=${currentUser.userId}`)
    if (!response.ok) {
      showToast("获取聊天记录失败", "error")
      return
    }

    const chatRecords = await response.json()
    if (!Array.isArray(chatRecords) || chatRecords.length === 0) {
      showToast("暂无聊天记录可下载", "info")
      return
    }

    // 按创建时间排序
    const sortedRecords = chatRecords.sort((a, b) => new Date(a.createAt) - new Date(b.createAt))

    let content = `心灵伴侣聊天记录\n`
    content += `用户: ${currentUser.username}\n`
    content += `导出时间: ${new Date().toLocaleString("zh-CN")}\n`
    content += `\n${"=".repeat(50)}\n\n`

    sortedRecords.forEach((record, index) => {
      const time = new Date(record.createAt).toLocaleString("zh-CN")
      content += `[${index + 1}] ${time}\n`
      content += `用户: ${record.query}\n`
      content += `AI伴侣: ${record.content}\n`
      content += `\n${"-".repeat(30)}\n\n`
    })

    // 创建下载链接
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `心灵伴侣聊天记录_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showToast("聊天记录下载成功", "success")
  } catch (error) {
    console.error("下载聊天记录失败:", error)
    showToast("下载聊天记录失败", "error")
  }
}

/* AI工具箱 */
function loadAITools() {
  // 加载文本处理工具
  const textToolsGrid = document.getElementById("text-tools-grid")
  if (textToolsGrid) {
    textToolsGrid.innerHTML = ""
    aiTools.text.forEach((tool) => {
      const toolItem = createToolItem(tool)
      textToolsGrid.appendChild(toolItem)
    })
  }

  // 加载图像处理工具
  const imageToolsGrid = document.getElementById("image-tools-grid")
  if (imageToolsGrid) {
    imageToolsGrid.innerHTML = ""
    aiTools.image.forEach((tool) => {
      const toolItem = createToolItem(tool)
      imageToolsGrid.appendChild(toolItem)
    })
  }

  // 加载视频处理工具
  const videoToolsGrid = document.getElementById("video-tools-grid")
  if (videoToolsGrid) {
    videoToolsGrid.innerHTML = ""
    aiTools.video.forEach((tool) => {
      const toolItem = createToolItem(tool)
      videoToolsGrid.appendChild(toolItem)
    })
  }

  // 加载代码开发工具
  const codeToolsGrid = document.getElementById("code-tools-grid")
  if (codeToolsGrid) {
    codeToolsGrid.innerHTML = ""
    aiTools.code.forEach((tool) => {
      const toolItem = createToolItem(tool)
      codeToolsGrid.appendChild(toolItem)
    })
  }
}

function createToolItem(tool) {
  const toolItem = document.createElement("a")
  toolItem.className = "tool-item"
  toolItem.href = tool.url
  toolItem.target = "_blank"
  toolItem.rel = "noopener noreferrer"

  toolItem.innerHTML = `
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.description)}</p>
    `

  // 添加点击统计
  toolItem.addEventListener("click", () => {
    showToast(`正在跳转到 ${tool.name}`, "info")
  })

  return toolItem
}

function setupFaceSwapEventListeners() {
  // 换脸类型选择
  elements.typeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      elements.typeOptions.forEach((opt) => opt.classList.remove("active"))
      option.classList.add("active")
      currentSwapType = option.dataset.type // 这里会是 "imgSwap" 或 "videoSwap"

      console.log("切换换脸类型为:", currentSwapType) // 调试日志

      // 更新文件接受类型
      updateFileAcceptTypes()

      // 重置预览和文件数据
      resetSwapPreviews()
      resetFileData()
    })
  })

  // 源文件上传
  elements.srcUploadBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
      showAuthModal()
      return
    }
    elements.srcFileInput.click()
  })

  elements.srcFileInput.addEventListener("change", handleSrcFileUpload)

  // 源文件URL
  elements.srcUrlBtn.addEventListener("click", handleSrcUrlUpload)

  // 目标文件上传
  elements.dstUploadBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
      showAuthModal()
      return
    }
    elements.dstFileInput.click()
  })

  elements.dstFileInput.addEventListener("change", handleDstFileUpload)

  // 目标文件URL
  elements.dstUrlBtn.addEventListener("click", handleDstUrlUpload)

  // 开始换脸
  elements.startSwapBtn.addEventListener("click", startFaceSwap)

  // 重置
  elements.resetSwapBtn.addEventListener("click", resetSwapForm)

  // 刷新历史
  elements.refreshHistoryBtn.addEventListener("click", loadFaceSwapHistory)

  // 开始换脸按钮
  elements.newFaceSwapBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
      showAuthModal()
      return
    }
    // 滚动到换脸工具区域
    document.getElementById("face-swap-tool").scrollIntoView({ behavior: "smooth" })
  })
}

function updateFileAcceptTypes() {
  if (currentSwapType === "imgSwap") {
    // 图片换脸：源文件只支持图片
    elements.srcFileInput.setAttribute("accept", "image/*")
  } else if (currentSwapType === "videoSwap") {
    // 视频换脸：源文件支持图片和视频
    elements.srcFileInput.setAttribute("accept", "image/*,video/*")
  }

  // 目标文件始终只支持图片（人脸）
  elements.dstFileInput.setAttribute("accept", "image/*")
}

function resetFileData() {
  // 清理预览URL
  if (srcFileData && srcFileData.type === "file" && srcFileData.preview) {
    URL.revokeObjectURL(srcFileData.preview)
  }
  if (dstFileData && dstFileData.type === "file" && dstFileData.preview) {
    URL.revokeObjectURL(dstFileData.preview)
  }

  // 重置文件数据
  srcFileData = null
  dstFileData = null

  // 重置输入框
  elements.srcFileInput.value = ""
  elements.srcUrlInput.value = ""
  elements.dstFileInput.value = ""
  elements.dstUrlInput.value = ""

  // 重置按钮状态
  checkSwapButtonState()
}

function toggleSidebar() {
  if (window.innerWidth <= 1024) {
    elements.sidebar.classList.toggle("show")
  } else {
    elements.sidebar.classList.toggle("collapsed")
    isSidebarCollapsed = !isSidebarCollapsed
    localStorage.setItem("sidebarCollapsed", isSidebarCollapsed)
  }
}

function switchSection(sectionName) {
  // 隐藏所有section
  elements.sections.forEach((section) => {
    section.classList.remove("active")
  })

  // 显示目标section
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")

    // 根据section加载相应数据
    switch (sectionName) {
      case "dashboard":
        loadDashboardData()
        break
      case "files":
        if (isLoggedIn) loadFiles()
        break
      case "photos":
        if (isLoggedIn) loadPhotos()
        break
      case "todos":
        if (isLoggedIn) loadTodos()
        break
      case "face-swap":
        if (isLoggedIn) loadFaceSwapHistory()
        break
      case "heart":
        // 心灵伴侣页面：加载聊天历史
        if (isLoggedIn) loadHeartChatHistory()
        break
      case "settings":
        if (isLoggedIn) updateSettingsDisplay()
        break
    }
  }

  // 在移动端关闭侧边栏
  if (window.innerWidth <= 1024) {
    elements.sidebar.classList.remove("show")
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  const icon = elements.themeToggle.querySelector(".material-icons")
  icon.textContent = theme === "dark" ? "light_mode" : "dark_mode"
}

function toggleUserMenu() {
  elements.userDropdown.classList.toggle("show")
}

function hideUserMenu() {
  elements.userDropdown.classList.remove("show")
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
  }
}

function showFormModal(title, content) {
  document.getElementById("form-modal-title").textContent = title
  document.getElementById("form-modal-body").innerHTML = content
  showModal("form-modal")
}

function showLoading(text = "加载中...") {
  elements.loadingText.textContent = text
  elements.loading.classList.add("show")
}

function hideLoading() {
  elements.loading.classList.remove("show")
}

function showToast(message, type = "info") {
  const iconMap = {
    success: "check_circle",
    error: "error",
    warning: "warning",
    info: "info",
  }

  elements.toastIcon.textContent = iconMap[type] || "info"
  elements.toastMessage.textContent = message
  elements.toast.className = `toast ${type} show`

  // 自动隐藏
  setTimeout(() => {
    hideToast()
  }, 5000)
}

function hideToast() {
  elements.toast.classList.remove("show")
}

/* 认证相关 */
function checkLoginStatus() {
  const userData = localStorage.getItem("userData")
  if (userData) {
    try {
      currentUser = JSON.parse(userData)
      isLoggedIn = true
      updateUIForLoggedInUser()
    } catch (error) {
      console.error("解析用户数据失败:", error)
      localStorage.removeItem("userData")
      showAuthModal()
    }
  } else {
    showAuthModal()
  }
}

function showAuthModal() {
  showModal("auth-modal")
}

function switchAuthMode() {
  const title = document.getElementById("auth-title")
  const subtitle = document.getElementById("auth-subtitle")
  const submitBtn = document.getElementById("auth-submit")
  const switchBtn = document.getElementById("auth-switch-btn")
  const emailField = document.getElementById("email-field")
  const phoneField = document.getElementById("phone-field")

  const isLogin = title.textContent.includes("登录")

  if (isLogin) {
    // 切换到注册模式
    title.textContent = "创建临时工作站账户"
    subtitle.textContent = "注册新账户以开始使用"
    submitBtn.textContent = "创建账户"
    switchBtn.textContent = "已有账户？登录"
    emailField.style.display = "block"
    phoneField.style.display = "block"
    phoneField.style.display = "block"
  } else {
    // 切换到登录模式
    title.textContent = "登录到临时工作站"
    subtitle.textContent = "使用您的账户继续"
    submitBtn.textContent = "登录"
    switchBtn.textContent = "创建账户"
    emailField.style.display = "none"
    phoneField.style.display = "none"
  }
}

async function handleAuth(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const isLogin = document.getElementById("auth-title").textContent.includes("登录")

  showLoading(isLogin ? "正在登录..." : "正在注册...")

  try {
    const endpoint = isLogin ? "/user/login" : "/user/register"
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const userData = await response.json()
      if (userData && userData.userId) {
        currentUser = userData
        isLoggedIn = true
        localStorage.setItem("userData", JSON.stringify(userData))
        updateUIForLoggedInUser()
        hideModal("auth-modal")
        showToast(isLogin ? "登录成功，欢迎回来！" : "注册成功，欢迎使用！", "success")

        // 重置表单
        e.target.reset()

        // 加载仪表板数据
        loadDashboardData()

        // 如果是登录，加载聊天历史
        if (isLogin) {
          loadHeartChatHistory()
        }
      } else {
        showToast(isLogin ? "用户名或密码错误，请检查后重试" : "注册失败，用户名可能已存在", "error")
      }
    } else {
      showToast("网络错误，请检查网络连接后重试", "error")
    }
  } catch (error) {
    console.error("Auth error:", error)
    showToast("操作失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

function updateUIForLoggedInUser() {
  if (currentUser) {
    elements.userName.textContent = currentUser.username
    elements.userEmail.textContent = currentUser.email || "未绑定邮箱"

    // 更新头像
    if (currentUser.avatarPath) {
      const avatarUrl = `${FILE_SERVER_URL}${currentUser.avatarPath}`
      elements.userAvatar.src = avatarUrl
      elements.dropdownAvatar.src = avatarUrl
      elements.settingsAvatar.src = avatarUrl
    } else {
      // 默认头像
      const defaultAvatar = "/diverse-user-avatars.png"
      elements.userAvatar.src = defaultAvatar
      elements.dropdownAvatar.src = defaultAvatar
      elements.settingsAvatar.src = defaultAvatar
    }

    loadDashboardData()
    // 加载聊天历史
    loadHeartChatHistory()
  }
}

async function logout() {
  showLoading("正在退出...")

  try {
    await fetch("/user/logout", {
      method: "POST",
    })

    currentUser = null
    isLoggedIn = false
    localStorage.removeItem("userData")
    hideUserMenu()
    showAuthModal()
    showToast("已安全退出登录", "info")

    // 清空数据
    clearAllData()
  } catch (error) {
    console.error("Logout error:", error)
    showToast("退出登录时发生错误", "error")
  } finally {
    hideLoading()
  }
}

function clearAllData() {
  elements.filesContainer.innerHTML = ""
  elements.photosGrid.innerHTML = ""
  elements.todosList.innerHTML = ""
  elements.faceSwapHistoryList.innerHTML = ""

  // 重置统计
  elements.filesCount.textContent = "0"
  elements.photosCount.textContent = "0"
  elements.pendingTodosCount.textContent = "0"
  elements.faceSwapCount.textContent = "0"
  elements.filesNavCount.textContent = "0"
  elements.photosNavCount.textContent = "0"
  elements.todosNavCount.textContent = "0"
  elements.faceSwapNavCount.textContent = "0"
  elements.totalTodos.textContent = "0"
  elements.pendingTodos.textContent = "0"
  elements.completedTodos.textContent = "0"

  // 重置头像
  elements.userAvatar.src = "/diverse-user-avatars.png"
  elements.dropdownAvatar.src = "/diverse-user-avatars.png"
  elements.userName.textContent = "未登录"
  elements.userEmail.textContent = "请先登录"

  // 重置换脸表单
  resetSwapForm()

  // 清空心灵伴侣聊天记录界面
  const chatHistory = elements.heartChatHistory
  if (chatHistory) {
    chatHistory.innerHTML = `
      <div class="welcome-message">
        <div class="message-bubble ai-message">
          <div class="message-content">
            <p>你好！我是你的心灵伴侣，很高兴见到你。无论你想分享什么，我都会认真倾听。有什么想聊的吗？</p>
          </div>
          <div class="message-time">刚刚</div>
        </div>
      </div>
    `
  }
}

/* 仪表板数据 */
async function loadDashboardData() {
  if (!isLoggedIn) return

  try {
    // 加载文件数量
    const filesResponse = await fetch(`/file/selectByUserId?userId=${currentUser.userId}`)
    if (filesResponse.ok) {
      const files = await filesResponse.json()
      const fileCount = Array.isArray(files) ? files.length : 0
      elements.filesCount.textContent = fileCount
      elements.filesNavCount.textContent = fileCount
    }

    // 加载照片数量
    const photosResponse = await fetch(`/photo/selectById?userId=${currentUser.userId}`)
    if (photosResponse.ok) {
      const photos = await photosResponse.json()
      const photoCount = Array.isArray(photos) ? photos.length : 0
      elements.photosCount.textContent = photoCount
      elements.photosNavCount.textContent = photoCount
    }

    // 加载待办事项数量
    const todosResponse = await fetch(`/todo/selectByUserId?userId=${currentUser.userId}`)
    if (todosResponse.ok) {
      const todos = await todosResponse.json()
      if (Array.isArray(todos)) {
        const pendingCount = todos.filter((todo) => !todo.isDone).length
        elements.pendingTodosCount.textContent = pendingCount
        elements.todosNavCount.textContent = pendingCount
      }
    }

    // 加载换脸历史数量
    const swapResponse = await fetch(`/swap/selectByUserId?userId=${currentUser.userId}`)
    if (swapResponse.ok) {
      const swaps = await swapResponse.json()
      const swapCount = Array.isArray(swaps) ? swaps.length : 0
      elements.faceSwapCount.textContent = swapCount
      elements.faceSwapNavCount.textContent = swapCount
    }
  } catch (error) {
    console.error("Dashboard data error:", error)
    showToast("加载仪表板数据失败", "error")
  }
}

// 在 AI换脸功能 部分，完全重写换脸相关的函数：

/* AI换脸功能 - 重新设计 */
let srcFileData = null // 存储源文件数据：{type: 'file'|'url', data: File|string, preview: string}
let dstFileData = null // 存储目标文件数据：{type: 'file'|'url', data: File|string, preview: string}

async function handleSrcFileUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  // 验证文件类型 - 根据当前换脸类型
  let validTypes = []
  if (currentSwapType === "imgSwap") {
    validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  } else if (currentSwapType === "videoSwap") {
    validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/wmv",
      "video/flv",
      "video/mkv",
    ]
  }

  if (!validTypes.includes(file.type)) {
    const typeText = currentSwapType === "imgSwap" ? "图片换脸只支持图片格式" : "视频换脸支持图片和视频格式"
    showToast(`${typeText}，不支持: ${file.type}`, "error")
    return
  }

  // 创建预览URL
  const previewUrl = URL.createObjectURL(file)

  // 存储文件数据
  srcFileData = {
    type: "file",
    data: file,
    preview: previewUrl,
    name: file.name,
  }

  updateSrcPreview(previewUrl, file.type)
  checkSwapButtonState()
  showToast("源文件选择成功", "success")
}

function handleSrcUrlUpload() {
  const url = elements.srcUrlInput.value.trim()
  if (!url) {
    showToast("请输入有效的文件链接", "warning")
    return
  }

  // 基本URL格式验证
  try {
    new URL(url)
  } catch (error) {
    showToast("请输入有效的URL格式", "error")
    return
  }

  // 检查是否是支持的文件类型 - 根据当前换脸类型
  let supportedExtensions = []
  let fileTypeText = ""

  if (currentSwapType === "imgSwap") {
    supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"]
    fileTypeText = "图片"
  } else if (currentSwapType === "videoSwap") {
    supportedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".mp4",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
    ]
    fileTypeText = "图片或视频"
  }

  const hasValidExtension = supportedExtensions.some((ext) => url.toLowerCase().includes(ext))

  if (!hasValidExtension) {
    showToast(`请确保链接指向有效的${fileTypeText}文件`, "warning")
  }

  // 根据URL推测文件类型
  let contentType = "image/jpeg"
  const lowerUrl = url.toLowerCase()
  if (lowerUrl.includes(".png")) contentType = "image/png"
  else if (lowerUrl.includes(".gif")) contentType = "image/gif"
  else if (lowerUrl.includes(".webp")) contentType = "image/webp"
  else if (lowerUrl.includes(".mp4")) contentType = "video/mp4"
  else if (lowerUrl.includes(".avi")) contentType = "video/avi"
  else if (lowerUrl.includes(".mov")) contentType = "video/mov"

  // 存储URL数据
  srcFileData = {
    type: "url",
    data: url,
    preview: url,
    name: url.split("/").pop() || "URL文件",
  }

  updateSrcPreview(url, contentType)
  checkSwapButtonState()
  showToast("源文件链接设置成功", "success")
}

async function handleDstFileUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  // 验证文件类型（目标文件只支持图片）
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

  if (!validTypes.includes(file.type)) {
    showToast(`目标人脸只支持图片格式，不支持: ${file.type}`, "error")
    return
  }

  // 创建预览URL
  const previewUrl = URL.createObjectURL(file)

  // 存储文件数据
  dstFileData = {
    type: "file",
    data: file,
    preview: previewUrl,
    name: file.name,
  }

  updateDstPreview(previewUrl)
  checkSwapButtonState()
  showToast("目标人脸选择成功", "success")
}

function handleDstUrlUpload() {
  const url = elements.dstUrlInput.value.trim()
  if (!url) {
    showToast("请输入有效的图片链接", "warning")
    return
  }

  // 基本URL格式验证
  try {
    new URL(url)
  } catch (error) {
    showToast("请输入有效的URL格式", "error")
    return
  }

  // 检查是否是支持的图片类型
  const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"]
  const hasValidExtension = supportedExtensions.some((ext) => url.toLowerCase().includes(ext))

  if (!hasValidExtension) {
    showToast("请确保链接指向有效的图片文件", "warning")
  }

  // 存储URL数据
  dstFileData = {
    type: "url",
    data: url,
    preview: url,
    name: url.split("/").pop() || "URL图片",
  }

  updateDstPreview(url)
  checkSwapButtonState()
  showToast("目标人脸链接设置成功", "success")
}

function updateSrcPreview(url, type) {
  const preview = elements.srcPreview
  preview.classList.add("has-content")

  if (type.includes("image")) {
    preview.innerHTML = `<img src="${url}" alt="源文件预览" onerror="this.src='/placeholder.jpg?height=200&width=200&text=图片加载失败'">`
  } else if (type.includes("video")) {
    preview.innerHTML = `<video src="${url}" controls style="max-width: 100%; max-height: 100%;">您的浏览器不支持视频播放</video>`
  } else {
    preview.innerHTML = `<div class="preview-placeholder"><span class="material-icons">insert_drive_file</span><p>文件已选择</p></div>`
  }
}

function updateDstPreview(url) {
  const preview = elements.dstPreview
  preview.classList.add("has-content")
  preview.innerHTML = `<img src="${url}" alt="目标人脸预览" onerror="this.src='/placeholder.jpg?height=200&width=200&text=图片加载失败'">`
}

function checkSwapButtonState() {
  const hasFiles = srcFileData && dstFileData
  elements.startSwapBtn.disabled = !hasFiles
}

function resetSwapPreviews() {
  elements.srcPreview.classList.remove("has-content")
  elements.srcPreview.innerHTML = `
        <div class="preview-placeholder">
            <span class="material-icons">add_photo_alternate</span>
            <p>选择源文件</p>
        </div>
    `

  elements.dstPreview.classList.remove("has-content")
  elements.dstPreview.innerHTML = `
        <div class="preview-placeholder">
            <span class="material-icons">face</span>
            <p>选择目标人脸</p>
        </div>
    `
}

function resetSwapForm() {
  // 清理预览URL
  if (srcFileData && srcFileData.type === "file" && srcFileData.preview) {
    URL.revokeObjectURL(srcFileData.preview)
  }
  if (dstFileData && dstFileData.type === "file" && dstFileData.preview) {
    URL.revokeObjectURL(dstFileData.preview)
  }

  // 重置文件数据
  srcFileData = null
  dstFileData = null

  // 重置输入框
  elements.srcFileInput.value = ""
  elements.srcUrlInput.value = ""
  elements.dstFileInput.value = ""
  elements.dstUrlInput.value = ""

  // 重置预览
  resetSwapPreviews()

  // 重置按钮状态
  checkSwapButtonState()

  showToast("表单已重置", "info")
}

async function startFaceSwap() {
  if (!srcFileData || !dstFileData) {
    showToast("请先选择源文件和目标人脸", "warning")
    return
  }

  showLoading("正在处理换脸，这可能需要1-2分钟，请耐心等待...")

  try {
    let resultUrl = ""

    // 判断是否需要混合调用（一个文件一个URL）
    const srcIsFile = srcFileData.type === "file"
    const dstIsFile = dstFileData.type === "file"

    if (srcIsFile && dstIsFile) {
      // 两个都是文件，调用 swapImgFile
      resultUrl = await callSwapImgFile()
    } else if (!srcIsFile && !dstIsFile) {
      // 两个都是URL，调用 swapImgUrl
      resultUrl = await callSwapImgUrl()
    } else {
      // 混合情况：一个文件一个URL
      // 我们需要先上传文件，然后都用URL方式调用
      resultUrl = await callMixedSwap()
    }

    if (resultUrl && resultUrl.trim()) {
      showToast("换脸处理完成！", "success")

      // 立即更新仪表板数据
      loadDashboardData()

      // 刷新历史记录
      loadFaceSwapHistory()

      // 预览结果
      previewSwapResult(resultUrl)

      // 自动保存
      autoSavePhoto(resultUrl)
    } else {
      showToast("换脸处理失败，请重试", "error")
    }
  } catch (error) {
    console.error("Face swap error:", error)
    showToast("换脸处理失败：" + (error.message || "未知错误"), "error")
  } finally {
    hideLoading()
  }
}

async function callSwapImgFile() {
  const formData = new FormData()
  formData.append("src", srcFileData.data)
  formData.append("dst", dstFileData.data)
  formData.append("type", currentSwapType)
  formData.append("userId", currentUser.userId)

  const response = await fetch("/swap/swapImgFile", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return await response.text()
}

async function callSwapImgUrl() {
  const formData = new FormData()
  formData.append("src", srcFileData.data)
  formData.append("dst", dstFileData.data)
  formData.append("type", currentSwapType)
  formData.append("userId", currentUser.userId)

  const response = await fetch("/swap/swapImgUrl", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return await response.text()
}

async function callMixedSwap() {
  // 对于混合情况，我们需要先上传文件，然后获取URL
  let srcUrl = srcFileData.data
  let dstUrl = dstFileData.data

  // 如果源文件是本地文件，先上传
  if (srcFileData.type === "file") {
    srcUrl = await uploadFileAndGetUrl(srcFileData.data, "face-swap-temp")
  }

  // 如果目标文件是本地文件，先上传
  if (dstFileData.type === "file") {
    dstUrl = await uploadFileAndGetUrl(dstFileData.data, "face-swap-temp")
  }

  // 现在都是URL了，调用URL接口
  const formData = new FormData()
  formData.append("src", srcUrl)
  formData.append("dst", dstUrl)
  formData.append("type", currentSwapType)
  formData.append("userId", currentUser.userId)

  const response = await fetch("/swap/swapImgUrl", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return await response.text()
}

async function uploadFileAndGetUrl(file, category) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("userId", currentUser.userId)
  formData.append("cate", category)

  const response = await fetch("/file/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("文件上传失败")
  }

  const result = await response.json()
  if (result <= 0) {
    throw new Error("文件上传失败")
  }

  // 获取上传后的文件信息
  const filesResponse = await fetch(`/file/selectByUserId?userId=${currentUser.userId}`)
  if (!filesResponse.ok) {
    throw new Error("获取文件信息失败")
  }

  const files = await filesResponse.json()
  const uploadedFile = files.find((f) => f.name === file.name)
  if (!uploadedFile) {
    throw new Error("找不到上传的文件")
  }

  return `${FILE_SERVER_URL}${uploadedFile.path}`
}

function previewSwapResult(resultUrl) {
  currentPreviewItem = {
    id: null,
    name: "换脸结果",
    path: resultUrl.startsWith("http") ? resultUrl : resultUrl,
    type: currentSwapType === "imgSwap" ? "image/jpeg" : "video/mp4",
    size: 0,
    isSwapResult: true,
  }

  elements.previewTitle.textContent = "换脸结果"

  const fullUrl = resultUrl.startsWith("http") ? resultUrl : `${FILE_SERVER_URL}${resultUrl}`

  let previewContent = ""
  if (currentSwapType === "imgSwap") {
    previewContent = `<img src="${fullUrl}" alt="换脸结果" style="max-width: 100%; max-height: 500px; object-fit: contain;">`
  } else if (currentSwapType === "videoSwap") {
    previewContent = `<video controls style="max-width: 100%; max-height: 500px;">
            <source src="${fullUrl}" type="video/mp4">
            您的浏览器不支持视频播放
        </video>`
  }

  elements.previewContainer.innerHTML = previewContent

  elements.previewInfo.innerHTML = `
        <h4>换脸结果</h4>
        <p><strong>类型:</strong> ${currentSwapType === "imgSwap" ? "图片换脸" : "视频换脸"}</p>
        <p><strong>源文件:</strong> ${srcFileData.name}</p>
        <p><strong>目标人脸:</strong> ${dstFileData.name}</p>
        <p><strong>链接:</strong> <code>${fullUrl}</code></p>
    `

  showModal("preview-modal")
}

async function loadFaceSwapHistory() {
  if (!isLoggedIn) return

  try {
    const response = await fetch(`/swap/selectByUserId?userId=${currentUser.userId}`)
    if (response.ok) {
      let swaps = await response.json()
      swaps = sortItemsByTime(Array.isArray(swaps) ? swaps : [], "createAt")
      renderFaceSwapHistory(swaps)
    }
  } catch (error) {
    console.error("Load face swap history error:", error)
    showToast("加载换脸历史失败", "error")
  }
}

function renderFaceSwapHistory(swaps) {
  elements.faceSwapHistoryList.innerHTML = ""

  if (swaps.length === 0) {
    elements.faceSwapHistoryList.innerHTML = `
            <div class="empty-state">
                <span class="material-icons">face_retouching_natural</span>
                <h3>暂无换脸记录</h3>
                <p>开始您的第一次AI换脸体验</p>
            </div>
        `
    return
  }

  swaps.forEach((swap) => {
    const historyItem = document.createElement("div")
    historyItem.className = "history-item"
    historyItem.onclick = () => previewSwapHistory(swap)

    const status = swap.swapPath ? "completed" : "processing"
    const statusText = swap.swapPath ? "已完成" : "处理中"

    // 判断是否为视频文件
    const isVideo =
      swap.srcPath && (swap.srcPath.includes(".mp4") || swap.srcPath.includes(".avi") || swap.srcPath.includes(".mov"))
    const typeText = isVideo ? "视频换脸" : "图片换脸"
    const typeIcon = isVideo ? "videocam" : "image"

    // 创建源文件缩略图
    const srcThumbnail = createHistoryThumbnail(swap.srcPath, "源文件", isVideo)

    // 创建目标人脸缩略图（始终是图片）
    const dstThumbnail = createHistoryThumbnail(swap.dstPath, "目标", false)

    // 创建结果缩略图
    let resultThumbnail = ""
    if (swap.swapPath) {
      resultThumbnail = createHistoryThumbnail(swap.swapPath, "结果", isVideo)
    } else {
      resultThumbnail = `<div class="history-thumbnail" style="display: flex; align-items: center; justify-content: center; background-color: var(--hover-bg);">
                          <span class="material-icons">hourglass_empty</span>
                        </div>`
    }

    historyItem.innerHTML = `
            <div class="history-item-header">
                <div class="history-type">
                    <span class="material-icons">${typeIcon}</span>
                    <span>${typeText}</span>
                </div>
                <div class="history-time">${formatDate(swap.createAt)}</div>
            </div>
            <div class="history-preview">
                ${srcThumbnail}
                <span class="material-icons history-arrow">arrow_forward</span>
                ${dstThumbnail}
                <span class="material-icons history-arrow">arrow_forward</span>
                ${resultThumbnail}
            </div>
            <div class="history-info">
                <div class="history-status ${status}">${statusText}</div>
            </div>
        `

    elements.faceSwapHistoryList.appendChild(historyItem)
  })
}

// 新增函数：创建历史记录缩略图
function createHistoryThumbnail(filePath, altText, isVideo) {
  if (!filePath) {
    return `<div class="history-thumbnail" style="display: flex; align-items: center; justify-content: center; background-color: var(--hover-bg);">
              <span class="material-icons">broken_image</span>
            </div>`
  }

  if (isVideo) {
    // 对于视频文件，显示视频缩略图带播放图标
    return `<div class="history-thumbnail video-thumbnail" style="position: relative;">
              <video class="thumbnail-video" style="width: 100%; height: 100%; object-fit: cover;" 
                     muted preload="metadata"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <source src="${filePath}#t=1" type="video/mp4">
              </video>
              <div class="video-fallback" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background-color: var(--hover-bg);">
                <span class="material-icons">movie</span>
              </div>
              <div class="video-play-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                                                     background: rgba(0,0,0,0.6); border-radius: 50%; width: 24px; height: 24px; 
                                                     display: flex; align-items: center; justify-content: center;">
                <span class="material-icons" style="color: white; font-size: 16px;">play_arrow</span>
              </div>
            </div>`
  } else {
    // 对于图片文件，正常显示
    return `<img src="${filePath}" alt="${altText}" class="history-thumbnail" 
                 onerror="this.src='/placeholder.jpg?height=60&width=60&text=${altText}'">`
  }
}

function previewSwapHistory(swap) {
  if (!swap.swapPath) {
    showToast("换脸还在处理中，请稍后查看", "info")
    return
  }

  // 判断是否为视频文件
  const isVideo =
    swap.srcPath && (swap.srcPath.includes(".mp4") || swap.srcPath.includes(".avi") || swap.srcPath.includes(".mov"))

  currentPreviewItem = {
    id: swap.swapId,
    name: "换脸结果",
    path: swap.swapPath,
    type: isVideo ? "video/mp4" : "image/jpeg",
    size: 0,
    isSwapResult: true,
  }

  elements.previewTitle.textContent = "换脸历史 - " + formatDate(swap.createAt)

  const resultUrl = swap.swapPath

  let previewContent = ""
  if (isVideo) {
    previewContent = `<video controls style="max-width: 100%; max-height: 500px;" autoplay muted>
            <source src="${resultUrl}" type="video/mp4">
            <source src="${resultUrl}" type="video/avi">
            <source src="${resultUrl}" type="video/mov">
            您的浏览器不支持视频播放
        </video>`
  } else {
    previewContent = `<img src="${resultUrl}" alt="换脸结果" style="max-width: 100%; max-height: 500px; object-fit: contain;">`
  }

  elements.previewContainer.innerHTML = previewContent

  elements.previewInfo.innerHTML = `
        <h4>换脸历史记录</h4>
        <p><strong>创建时间:</strong> ${formatDate(swap.createAt)}</p>
        <p><strong>类型:</strong> ${isVideo ? "视频换脸" : "图片换脸"}</p>
        <p><strong>文件格式:</strong> ${isVideo ? "视频文件" : "图片文件"}</p>
        <p><strong>链接:</strong> <code>${resultUrl}</code></p>
    `

  showModal("preview-modal")
}

function formatDate(dateString) {
  if (!dateString) return "未知时间"

  try {
    const date = new Date(dateString)
    // 减去8小时的时差（8 * 60 * 60 * 1000 毫秒）
    const adjustedDate = new Date(date.getTime() - 8 * 60 * 60 * 1000)
    return adjustedDate.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return "时间格式错误"
  }
}

/* 文件管理 */
async function loadFileCategories() {
  if (!isLoggedIn) return

  try {
    const response = await fetch(`/file/selectByUserId?userId=${currentUser.userId}`)
    if (response.ok) {
      const files = await response.json()
      if (Array.isArray(files)) {
        const categories = [...new Set(files.map((file) => file.cate))]

        // 更新下拉选择框
        elements.fileCategorySelect.innerHTML = '<option value="">选择已有目录</option>'
        categories.forEach((category) => {
          const option = document.createElement("option")
          option.value = category
          option.textContent = category
          elements.fileCategorySelect.appendChild(option)
        })
      }
    }
  } catch (error) {
    console.error("Load categories error:", error)
  }
}

async function handleFileUpload(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const category = elements.fileCategorySelect.value || elements.fileCategoryInput.value

  if (!category) {
    showToast("请选择或输入文件目录", "warning")
    return
  }

  formData.set("cate", category)
  formData.append("userId", currentUser.userId)

  showLoading("正在上传文件...")

  try {
    const response = await fetch("/file/upload", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("文件上传成功！", "success")
        hideModal("file-upload-modal")
        e.target.reset()
        elements.fileCategoryInput.disabled = false
        loadFiles()
        loadDashboardData()
      } else {
        showToast("文件上传失败，请重试", "error")
      }
    } else {
      showToast("上传失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("File upload error:", error)
    showToast("上传失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

/* 文件管理 */
async function loadFiles() {
  if (!isLoggedIn) return

  showLoading("正在加载文件...")

  try {
    const response = await fetch(`/file/selectByUserId?userId=${currentUser.userId}`)
    if (response.ok) {
      let files = await response.json()
      // 按创建时间降序排序
      files = sortItemsByTime(Array.isArray(files) ? files : [], "createTime")
      renderFilesByCategory(files)
    }
  } catch (error) {
    console.error("Load files error:", error)
    showToast("加载文件失败", "error")
  } finally {
    hideLoading()
  }
}

function renderFilesByCategory(files) {
  elements.filesContainer.innerHTML = ""

  if (files.length === 0) {
    elements.filesContainer.innerHTML = `
            <div class="empty-state">
                <span class="material-icons">folder_open</span>
                <h3>暂无文件</h3>
                <p>点击上传文件按钮开始管理您的文件</p>
                <button class="primary-btn" onclick="document.getElementById('upload-file-btn').click()">
                    <span class="material-icons">upload</span>
                    上传第一个文件
                </button>
            </div>
        `
    return
  }

  // 按分类分组
  const categories = {}
  files.forEach((file) => {
    if (!categories[file.cate]) {
      categories[file.cate] = []
    }
    categories[file.cate].push(file)
  })

  // 渲染每个分类
  Object.keys(categories).forEach((categoryName) => {
    const categoryFiles = categories[categoryName]
    const categorySection = document.createElement("div")
    categorySection.className = "category-section"

    categorySection.innerHTML = `
            <div class="category-header">
                <div class="category-title">
                    <span class="material-icons">folder</span>
                    <h3>${categoryName}</h3>
                    <span class="category-count">${categoryFiles.length}</span>
                </div>
            </div>
            <div class="files-grid">
                ${categoryFiles.map((file) => createFileItem(file)).join("")}
            </div>
        `

    elements.filesContainer.appendChild(categorySection)
  })
}

function createFileItem(file) {
  const iconName = getFileIcon(file.type)
  return `
        <div class="file-item" onclick="previewFile(${file.fileId}, '${escapeHtml(file.name)}', '${file.path}', '${file.type}', ${file.size})">
            <div class="file-icon">
                <span class="material-icons">${iconName}</span>
            </div>
            <div class="file-info">
                <h4 title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</h4>
                <p>${formatFileSize(file.size)} • ${file.type}</p>
            </div>
        </div>
    `
}

function getFileIcon(type) {
  if (type.includes("image")) return "image"
  if (type.includes("video")) return "movie"
  if (type.includes("audio")) return "audiotrack"
  if (type.includes("pdf")) return "picture_as_pdf"
  if (type.includes("word") || type.includes("document")) return "description"
  if (type.includes("excel") || type.includes("spreadsheet")) return "table_chart"
  if (type.includes("powerpoint") || type.includes("presentation")) return "slideshow"
  if (type.includes("zip") || type.includes("rar")) return "archive"
  if (type.includes("text")) return "text_snippet"
  return "insert_drive_file"
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

function previewFile(fileId, name, path, type, size) {
  currentPreviewItem = { id: fileId, name, path, type, size, isPhoto: false }

  elements.previewTitle.textContent = name

  // 构建完整的文件URL
  const fileUrl = `${FILE_SERVER_URL}${path}`

  // 根据文件类型生成预览内容
  let previewContent = ""

  if (type.includes("image")) {
    previewContent = `<img src="${fileUrl}" alt="${escapeHtml(name)}" style="max-width: 100%; max-height: 500px; object-fit: contain;">`
  } else if (type.includes("video")) {
    previewContent = `<video controls style="max-width: 100%; max-height: 500px;">
            <source src="${fileUrl}" type="${type}">
            您的浏览器不支持视频播放
        </video>`
  } else if (type.includes("audio")) {
    previewContent = `<audio controls style="width: 100%;">
            <source src="${fileUrl}" type="${type}">
            您的浏览器不支持音频播放
        </audio>`
  } else if (type.includes("pdf")) {
    previewContent = `<iframe src="${fileUrl}" style="width: 100%; height: 500px; border: none;"></iframe>`
  } else if (type.includes("text")) {
    previewContent = `<iframe src="${fileUrl}" style="width: 100%; height: 500px; border: none;"></iframe>`
  } else {
    previewContent = `
            <div style="text-align: center; padding: 48px;">
                <span class="material-icons" style="font-size: 64px; color: var(--text-secondary); margin-bottom: 16px;">${getFileIcon(type)}</span>
                <h3>无法预览此文件类型</h3>
                <p>请下载文件后使用相应的应用程序打开</p>
            </div>
        `
  }

  elements.previewContainer.innerHTML = previewContent

  // 显示文件信息
  elements.previewInfo.innerHTML = `
        <h4>${escapeHtml(name)}</h4>
        <p><strong>大小:</strong> ${formatFileSize(size)}</p>
        <p><strong>类型:</strong> ${type}</p>
        <p><strong>链接:</strong> <code>${fileUrl}</code></p>
    `

  showModal("preview-modal")
}

async function downloadCurrentPreview() {
  if (!currentPreviewItem) return

  const fileUrl = currentPreviewItem.isSwapResult
    ? currentPreviewItem.path.startsWith("http")
      ? currentPreviewItem.path
      : `${FILE_SERVER_URL}${currentPreviewItem.path}`
    : `${FILE_SERVER_URL}${currentPreviewItem.path}`

  try {
    // 创建一个临时链接来下载文件
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = currentPreviewItem.name
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showToast("开始下载文件", "success")
  } catch (error) {
    console.error("Download error:", error)
    showToast("下载失败，请稍后重试", "error")
  }
}

async function copyCurrentPreviewLink() {
  if (!currentPreviewItem) return

  const fileUrl = currentPreviewItem.isSwapResult
    ? currentPreviewItem.path.startsWith("http")
      ? currentPreviewItem.path
      : `${FILE_SERVER_URL}${currentPreviewItem.path}`
    : `${FILE_SERVER_URL}${currentPreviewItem.path}`

  try {
    // 检查是否支持现代剪贴板API
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(fileUrl)
      showToast("文件链接已复制到剪贴板", "success")
    } else {
      // 降级方案：使用传统方法
      copyToClipboardFallback(fileUrl)
    }
  } catch (error) {
    console.error("Copy error:", error)
    // 降级方案
    copyToClipboardFallback(fileUrl)
  }
}

// 添加降级复制函数
function copyToClipboardFallback(text) {
  try {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    const successful = document.execCommand("copy")
    document.body.removeChild(textArea)

    if (successful) {
      showToast("文件链接已复制到剪贴板", "success")
    } else {
      // 最后的降级方案：显示链接让用户手动复制
      showManualCopyDialog(text)
    }
  } catch (err) {
    console.error("Fallback copy failed:", err)
    showManualCopyDialog(text)
  }
}

// 添加手动复制对话框
function showManualCopyDialog(text) {
  const result = prompt("复制功能不可用，请手动复制以下链接:", text)
  if (result !== null) {
    showToast("请手动复制链接", "info")
  }
}

async function deleteCurrentPreview() {
  if (!currentPreviewItem) return

  if (currentPreviewItem.isSwapResult) {
    showToast("换脸结果暂不支持删除", "info")
    return
  }

  if (!confirm(`确定要删除文件"${currentPreviewItem.name}"吗？此操作不可撤销。`)) return

  showLoading("正在删除文件...")

  try {
    const endpoint = currentPreviewItem.isPhoto ? "/photo/delete" : "/file/delete"
    const param = currentPreviewItem.isPhoto ? "photoId" : "fileId"

    const formData = new FormData()
    formData.append(param, currentPreviewItem.id)

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("文件删除成功", "success")
        hideModal("preview-modal")

        // 重新加载相应的数据
        if (currentPreviewItem.isPhoto) {
          loadPhotos()
        } else {
          loadFiles()
        }
        loadDashboardData()
      } else {
        showToast("文件删除失败", "error")
      }
    }
  } catch (error) {
    console.error("Delete error:", error)
    showToast("删除失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

/* 照片管理 */
async function handlePhotoUpload(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const files = e.target.querySelector('input[type="file"]').files

  if (files.length === 0) {
    showToast("请选择要上传的照片", "warning")
    return
  }

  showLoading(`正在上传 ${files.length} 张照片...`)

  let successCount = 0
  let failCount = 0

  // 逐个上传照片
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)
    uploadFormData.append("userId", currentUser.userId)

    try {
      const response = await fetch("/photo/upload", {
        method: "POST",
        body: uploadFormData,
      })

      if (response.ok) {
        const result = await response.json()
        if (result > 0) {
          successCount++
        } else {
          failCount++
        }
      } else {
        failCount++
      }
    } catch (error) {
      console.error("Photo upload error:", error)
      failCount++
    }
  }

  hideLoading()

  if (successCount > 0) {
    showToast(
      `成功上传 ${successCount} 张照片${failCount > 0 ? `，${failCount} 张失败` : ""}`,
      failCount > 0 ? "warning" : "success",
    )
    hideModal("photo-upload-modal")
    e.target.reset()
    loadPhotos()
    loadDashboardData()
  } else {
    showToast("照片上传失败，请重试", "error")
  }
}

/* 照片管理 */
async function loadPhotos() {
  if (!isLoggedIn) return

  showLoading("正在加载照片...")

  try {
    const response = await fetch(`/photo/selectById?userId=${currentUser.userId}`)
    if (response.ok) {
      let photos = await response.json()
      // 按创建时间降序排序
      photos = sortItemsByTime(Array.isArray(photos) ? photos : [], "createTime")
      renderPhotos(photos)
    }
  } catch (error) {
    console.error("Load photos error:", error)
    showToast("加载照片失败", "error")
  } finally {
    hideLoading()
  }
}

async function autoSavePhoto(swapUrl) {
  if (!swapUrl) {
    showToast("链接无效", "warning")
    return
  }

  // 验证 URL 格式
  let url
  try {
    url = new URL(swapUrl)
  } catch (error) {
    showToast("文件链接格式无效", "error")
    return
  }

  // 验证是否为图片或视频文件
  const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".avi", ".mov"]
  const isSupported = supportedExtensions.some((ext) => url.pathname.toLowerCase().endsWith(ext))
  if (!isSupported) {
    showToast("链接必须指向图片（jpg, jpeg, png, gif, webp）或视频（mp4, avi, mov）文件", "error")
    return
  }

  showLoading("正在处理文件...")

  try {
    // 获取文件名和 MIME 类型
    let fileName = url.pathname.split("/").pop()
    const mimeType = getFileMimeType(fileName)
    const isVideo = mimeType.includes("video")

    // 下载文件并转换为 JPEG
    let blob
    if (isVideo) {
      blob = await getVideoFrameAsJpeg(swapUrl)
    } else {
      blob = await loadImageToJpeg(swapUrl)
    }

    // 确保文件名以 .jpg 结尾
    if (!fileName.includes(".")) {
      fileName += ".jpg"
    } else {
      fileName = fileName.replace(/\.[^/.]+$/, ".jpg")
    }

    // 创建 File 对象
    const file = new File([blob], fileName, { type: "image/jpeg" })

    // 上传到服务器
    const formData = new FormData()
    formData.append("file", file)
    formData.append("userId", currentUser.userId)

    const response = await fetch("/photo/upload", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("图片自动保存成功,链接永不失效,请前往相册查看！", "success")
        // 刷新照片列表和仪表板
        await loadPhotos()
        await loadDashboardData()
        // 验证文件是否可访问
        await verifyUploadedFile(currentUser.userId, fileName)
        // 顺便把swap表也更新一下
        const swapFormData = new FormData()
        swapFormData.append("userId", currentUser.userId)
        const swapRes = await fetch(`/swap/updateForever`, {
          method: "POST",
          body: swapFormData,
        })
        if (swapRes.ok) {
          const swapResult = await swapRes.json()
          if (swapResult === true) {
            showToast("swap表更新成功", "success")
          } else {
            showToast("swap表更新失败", "error")
          }
        } else {
          showToast(`swap表更新失败，HTTP 状态码: ${swapRes.status}`, "error")
        }
      } else {
        showToast("图片上传失败，请重试", "error")
      }
    } else {
      showToast(`上传失败，HTTP 状态码: ${response.status}`, "error")
    }
  } catch (error) {
    console.error("Copy to save photo error:", error)
    showToast("保存图片失败：" + error.message, "error")
  } finally {
    hideLoading()
  }
}

async function copyToSavePhoto() {
  const copyUrl = document.getElementById("copy-to-save").value

  if (!copyUrl) {
    showToast("请输入有效的文件链接", "warning")
    return
  }

  // 验证 URL 格式
  let url
  try {
    url = new URL(copyUrl)
  } catch (error) {
    showToast("文件链接格式无效", "error")
    return
  }

  // 验证是否为图片或视频文件
  const supportedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".avi", ".mov"]
  const isSupported = supportedExtensions.some((ext) => url.pathname.toLowerCase().endsWith(ext))
  if (!isSupported) {
    showToast("链接必须指向图片（jpg, jpeg, png, gif, webp）或视频（mp4, avi, mov）文件", "error")
    return
  }

  showLoading("正在处理文件...")

  try {
    // 获取文件名和 MIME 类型
    let fileName = url.pathname.split("/").pop()
    const mimeType = getFileMimeType(fileName)
    const isVideo = mimeType.includes("video")

    // 下载文件并转换为 JPEG
    let blob
    if (isVideo) {
      blob = await getVideoFrameAsJpeg(copyUrl)
    } else {
      blob = await loadImageToJpeg(copyUrl)
    }

    // 确保文件名以 .jpg 结尾
    if (!fileName.includes(".")) {
      fileName += ".jpg"
    } else {
      fileName = fileName.replace(/\.[^/.]+$/, ".jpg")
    }

    // 创建 File 对象
    const file = new File([blob], fileName, { type: "image/jpeg" })

    // 上传到服务器
    const formData = new FormData()
    formData.append("file", file)
    formData.append("userId", currentUser.userId)

    const response = await fetch("/photo/upload", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("图片保存成功！", "success")
        // 刷新照片列表和仪表板
        await loadPhotos()
        await loadDashboardData()
        // 验证文件是否可访问
        await verifyUploadedFile(currentUser.userId, fileName)
      } else {
        showToast("图片上传失败，请重试", "error")
      }
    } else {
      showToast(`上传失败，HTTP 状态码: ${response.status}`, "error")
    }
  } catch (error) {
    console.error("Copy to save photo error:", error)
    showToast("保存图片失败：" + error.message, "error")
  } finally {
    hideLoading()
  }
}

// 异步加载图片并转换为 JPEG
async function loadImageToJpeg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "Anonymous" // 处理跨域图片
    img.src = url

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("无法将图片转换为 JPEG"))
            }
          },
          "image/jpeg",
          0.8, // JPEG 质量
        )
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error("无法加载图片，可能由于跨域限制或图片不存在"))
    }
  })
}

// 从视频提取第一帧并转换为 JPEG
async function getVideoFrameAsJpeg(url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.crossOrigin = "Anonymous"
    video.src = url
    video.muted = true
    video.preload = "auto"

    video.onloadeddata = () => {
      try {
        video.currentTime = 0 // 获取第一帧
      } catch (error) {
        reject(error)
      }
    }

    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error("无法将视频帧转换为 JPEG"))
            }
          },
          "image/jpeg",
          0.8, // JPEG 质量
        )
      } catch (error) {
        reject(error)
      }
    }

    video.onerror = () => {
      reject(new Error("无法加载视频，可能由于跨域限制或视频不存在"))
    }
  })
}

// 验证上传的文件是否可访问
async function verifyUploadedFile(userId, fileName) {
  try {
    const response = await fetch(`/photo/selectById?userId=${userId}`)
    if (response.ok) {
      const photos = await response.json()
      const uploadedPhoto = photos.find((photo) => photo.name === fileName)
      if (uploadedPhoto) {
        const photoUrl = `${FILE_SERVER_URL}${uploadedPhoto.path}`
        const testResponse = await fetch(photoUrl, { method: "HEAD" })
        if (testResponse.ok) {
          console.log(`文件 ${fileName} 可访问: ${photoUrl}`)
        } else {
          showToast(`文件 ${fileName} 上传成功但无法访问`, "warning")
        }
      } else {
        showToast(`未找到上传的文件 ${fileName}`, "error")
      }
    } else {
      showToast("无法验证文件是否可访问", "error")
    }
  } catch (error) {
    console.error("Verify file error:", error)
    showToast("验证文件失败：" + error.message, "error")
  }
}

// 根据 URL 推测文件 MIME 类型
function getFileMimeType(url) {
  const extension = url.split(".").pop().toLowerCase()
  switch (extension) {
    case "png":
      return "image/png"
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "gif":
      return "image/gif"
    case "webp":
      return "image/webp"
    case "mp4":
      return "video/mp4"
    case "avi":
      return "video/avi"
    case "mov":
      return "video/quicktime"
    default:
      return "image/jpeg" // 默认 JPEG
  }
}

// 将 base64 转换为 Blob
function dataURItoBlob(dataURI) {
  if (!dataURI) {
    throw new Error("无效的 base64 数据")
  }
  const byteString = atob(dataURI.split(",")[1])
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }
  return new Blob([arrayBuffer], { type: mimeString })
}

function renderPhotos(photos) {
  elements.photosGrid.innerHTML = ""

  if (photos.length === 0) {
    elements.photosGrid.innerHTML = `
            <div class="empty-state">
                <span class="material-icons">photo_library</span>
                <h3>暂无照片</h3>
                <p>点击上传照片按钮开始管理您的照片</p>
                <button class="primary-btn" onclick="document.getElementById('upload-photo-btn').click()">
                    <span class="material-icons">add_photo_alternate</span>
                    上传第一张照片
                </button>
            </div>
        `
    return
  }

  photos.forEach((photo) => {
    const photoItem = document.createElement("div")
    photoItem.className = "photo-item"
    photoItem.onclick = () => previewPhoto(photo.photoId, photo.name, photo.path, photo.size, photo.place)

    const photoUrl = `${FILE_SERVER_URL}${photo.path}`

    photoItem.innerHTML = `
            <div class="photo-preview">
                <img src="${photoUrl}" alt="${escapeHtml(photo.name)}" loading="lazy" onerror="this.src='/photo-placeholder.png'">
            </div>
            <div class="photo-info">
                <h4 title="${escapeHtml(photo.name)}">${escapeHtml(photo.name)}</h4>
                <p>${formatFileSize(photo.size)} • ${photo.place || "未知位置"}</p>
            </div>
        `

    elements.photosGrid.appendChild(photoItem)
  })
}

function previewPhoto(photoId, name, path, size, place) {
  currentPreviewItem = { id: photoId, name, path, size, place, isPhoto: true }

  elements.previewTitle.textContent = name

  const photoUrl = `${FILE_SERVER_URL}${path}`

  elements.previewContainer.innerHTML = `
        <img src="${photoUrl}" alt="${escapeHtml(name)}" style="max-width: 100%; max-height: 500px; object-fit: contain;" 
             onerror="this.src='/photo-placeholder.png'">
    `

  elements.previewInfo.innerHTML = `
        <h4>${escapeHtml(name)}</h4>
        <p><strong>大小:</strong> ${formatFileSize(size)}</p>
        <p><strong>位置:</strong> ${place || "未知"}</p>
        <p><strong>链接:</strong> <code>${photoUrl}</code></p>
    `

  showModal("preview-modal")
}

/* 头像上传 */
async function handleAvatarUpload(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  formData.append("username", currentUser.username)

  showLoading("正在上传头像...")

  try {
    // 1. 上传头像
    const uploadResponse = await fetch("/user/uploadAvatar", {
      method: "POST",
      body: formData,
    })

    if (!uploadResponse.ok) {
      throw new Error("Avatar upload failed")
    }

    const uploadResult = await uploadResponse.json()
    if (uploadResult <= 0) {
      throw new Error("Avatar upload unsuccessful")
    }

    // 2. 调用 /user/login 获取更新后的用户数据
    const loginFormData = new FormData()
    loginFormData.append("username", currentUser.username)
    // 假设密码存储在 currentUser.password 或需要用户重新输入
    // 这里我们假设后端在上传头像后不需要密码即可返回最新用户数据
    // 如果需要密码，可能需要从 localStorage 或其他地方获取
    loginFormData.append("password", currentUser.password || "") // 注意：实际应用中需妥善处理密码

    const loginResponse = await fetch("/user/login", {
      method: "POST",
      body: loginFormData,
    })

    if (!loginResponse.ok) {
      throw new Error("Failed to fetch updated user data")
    }

    const userData = await loginResponse.json()
    if (userData && userData.userId) {
      // 3. 更新本地用户数据
      currentUser = userData
      localStorage.setItem("userData", JSON.stringify(userData))

      // 4. 更新 UI
      updateUIForLoggedInUser()
      updateSettingsDisplay()

      // 5. 关闭模态框并重置表单
      showToast("头像上传成功", "success")
      hideModal("avatar-upload-modal")
      e.target.reset()
    } else {
      throw new Error("Invalid user data received")
    }
  } catch (error) {
    console.error("Avatar upload error:", error)
    showToast("头像上传失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

/* 待办事项 */
async function loadTodos() {
  if (!isLoggedIn) return

  showLoading("正在加载待办事项...")

  try {
    const response = await fetch(`/todo/selectByUserId?userId=${currentUser.userId}`)
    if (response.ok) {
      let todos = await response.json()
      // 按创建时间降序排序
      todos = sortItemsByTime(Array.isArray(todos) ? todos : [], "createTime")
      renderTodos(todos)
    }
  } catch (error) {
    console.error("Load todos error:", error)
    showToast("加载待办事项失败", "error")
  } finally {
    hideLoading()
  }
}

function renderTodos(todos) {
  elements.todosList.innerHTML = ""

  if (todos.length === 0) {
    elements.todosList.innerHTML = `
            <div class="empty-state">
                <span class="material-icons">check_box_outline_blank</span>
                <h3>暂无待办事项</h3>
                <p>添加您的第一个待办事项，开始高效管理</p>
            </div>
        `
    return
  }

  let total = 0
  let pending = 0
  let completed = 0

  todos.forEach((todo) => {
    total++
    if (todo.isDone) {
      completed++
    } else {
      pending++
    }

    const todoItem = document.createElement("li")
    todoItem.className = "todo-item"
    todoItem.innerHTML = `
            <label class="checkbox-container">
                <input type="checkbox" ${todo.isDone ? "checked" : ""} onchange="toggleTodo(${todo.todoId}, this.checked)">
                <span class="checkmark"></span>
            </label>
            <span class="todo-text ${todo.isDone ? "completed" : ""}">${escapeHtml(todo.content)}</span>
            <div class="todo-actions">
                <button class="icon-btn" onclick="editTodo(${todo.todoId}, '${escapeHtml(todo.content)}')" title="编辑">
                    <span class="material-icons">edit</span>
                </button>
                <button class="icon-btn" onclick="deleteTodo(${todo.todoId})" title="删除">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        `

    elements.todosList.appendChild(todoItem)
  })

  // 更新统计
  elements.totalTodos.textContent = total
  elements.pendingTodos.textContent = pending
  elements.completedTodos.textContent = completed
}

async function addTodo() {
  const content = elements.newTodoInput.value.trim()
  if (!content) {
    showToast("请输入待办事项内容", "warning")
    return
  }

  showLoading("正在添加待办事项...")

  try {
    const formData = new FormData()
    formData.append("content", content)
    formData.append("userId", currentUser.userId)

    const response = await fetch("/todo/add", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("待办事项添加成功", "success")
        elements.newTodoInput.value = ""
        loadTodos()
        loadDashboardData()
      } else {
        showToast("待办事项添加失败", "error")
      }
    } else {
      showToast("添加失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Add todo error:", error)
    showToast("添加失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function toggleTodo(todoId, isDone) {
  showLoading("正在更新待办事项...")

  try {
    const formData = new FormData()
    formData.append("todoId", todoId)
    formData.append("isDone", isDone)

    const response = await fetch("/todo/update", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("待办事项状态更新成功", "success")
        loadTodos()
        loadDashboardData()
      } else {
        showToast("待办事项状态更新失败", "error")
      }
    } else {
      showToast("更新失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Toggle todo error:", error)
    showToast("更新失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function editTodo(todoId, currentContent) {
  const newContent = prompt("编辑待办事项", currentContent)
  if (newContent === null || newContent.trim() === "") {
    return // 用户取消或输入为空
  }

  showLoading("正在更新待办事项...")

  try {
    const formData = new FormData()
    formData.append("todoId", todoId)
    formData.append("content", newContent.trim())

    const response = await fetch("/todo/update", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("待办事项更新成功", "success")
        loadTodos()
      } else {
        showToast("待办事项更新失败", "error")
      }
    } else {
      showToast("更新失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Edit todo error:", error)
    showToast("更新失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function deleteTodo(todoId) {
  if (!confirm("确定要删除此待办事项吗？")) return

  showLoading("正在删除待办事项...")

  try {
    const formData = new FormData()
    formData.append("todoId", todoId)

    const response = await fetch("/todo/delete", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("待办事项删除成功", "success")
        loadTodos()
        loadDashboardData()
      } else {
        showToast("待办事项删除失败", "error")
      }
    } else {
      showToast("删除失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Delete todo error:", error)
    showToast("删除失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

/* 设置相关 */
function updateSettingsDisplay() {
  if (currentUser) {
    elements.settingsUsername.textContent = currentUser.username
    elements.settingsEmail.textContent = currentUser.email || "未绑定"
    elements.settingsPhone.textContent = currentUser.phone || "未绑定"

    // 更新头像
    if (currentUser.avatarPath) {
      const avatarUrl = `${FILE_SERVER_URL}${currentUser.avatarPath}`
      elements.settingsAvatar.src = avatarUrl
    } else {
      elements.settingsAvatar.src = "/diverse-user-avatars.png"
    }
  }
}

function createBindEmailForm() {
  return `
        <p>绑定邮箱可以用于密码找回和接收重要通知</p>
        <div class="input-group">
            <label for="email">邮箱地址</label>
            <input type="email" id="email-for-bind" name="email" placeholder="请输入您的邮箱地址">
        </div>
        <div class="form-actions">
            <button class="primary-btn" onclick="bindEmail()">绑定邮箱</button>
        </div>
    `
}

function createBindPhoneForm() {
  return `
        <p>绑定手机号码可以用于密码找回和接收验证码</p>
        <div class="input-group">
            <label for="phone">手机号码</label>
            <input type="tel" id="phone-for-bind" name="phone" placeholder="请输入您的手机号码">
        </div>
        <div class="form-actions">
            <button class="primary-btn" onclick="bindPhone()">绑定手机</button>
        </div>
    `
}

function createChangePasswordForm() {
  return `
        <p>修改您的账户密码，确保账户安全</p>
        <div class="input-group">
            <label for="oldPassword">旧密码</label>
            <input type="password" id="oldPassword" name="oldPassword" placeholder="请输入您的旧密码">
        </div>
        <div class="input-group">
            <label for="newPassword">新密码</label>
            <input type="password" id="newPassword" name="newPassword" placeholder="请输入您的新密码">
        </div>
        <div class="form-actions">
            <button class="primary-btn" onclick="changePassword()">修改密码</button>
        </div>
    `
}

async function bindEmail() {
  const email = document.getElementById("email-for-bind").value.trim()
  if (!email) {
    showToast("请输入邮箱地址", "warning")
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("请输入有效的邮箱地址", "warning")
    return
  }

  showLoading("正在绑定邮箱...")

  try {
    const formData = new FormData()
    formData.append("username", currentUser.username)
    formData.append("email", email)

    const response = await fetch("/user/bindEmail", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("邮箱绑定成功", "success")
        hideModal("form-modal")
        // 重新加载用户数据
        const userData = JSON.parse(localStorage.getItem("userData"))
        userData.email = email
        localStorage.setItem("userData", JSON.stringify(userData))
        updateUIForLoggedInUser()
        updateSettingsDisplay()
      } else {
        showToast("邮箱绑定失败", "error")
      }
    } else {
      showToast("绑定失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Bind email error:", error)
    showToast("绑定失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function bindPhone() {
  const phone = document.getElementById("phone-for-bind").value.trim()
  console.log(phone);
  
  if (!phone) {
    showToast("请输入手机号码", "warning")
    return
  }

  showLoading("正在绑定手机...")

  try {
    const formData = new FormData()
    formData.append("username", currentUser.username)
    formData.append("phone", phone)

    const response = await fetch("/user/bindPhone", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("手机绑定成功", "success")
        hideModal("form-modal")
        // 重新加载用户数据
        const userData = JSON.parse(localStorage.getItem("userData"))
        userData.phone = phone
        localStorage.setItem("userData", JSON.stringify(userData))
        updateUIForLoggedInUser()
        updateSettingsDisplay()
      } else {
        showToast("手机绑定失败", "error")
      }
    } else {
      showToast("绑定失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Bind phone error:", error)
    showToast("绑定失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function changePassword() {
  const oldPassword = document.getElementById("oldPassword").value.trim()
  const newPassword = document.getElementById("newPassword").value.trim()

  if (!oldPassword || !newPassword) {
    showToast("请输入旧密码和新密码", "warning")
    return
  }

  if (newPassword.length < 6) {
    showToast("新密码长度不能少于6位", "warning")
    return
  }

  showLoading("正在修改密码...")

  try {
    const formData = new FormData()
    formData.append("username", currentUser.username)
    formData.append("password", newPassword)

    const response = await fetch("/user/changePassword", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("密码修改成功，请重新登录", "success")
        hideModal("form-modal")
        logout()
      } else {
        showToast("旧密码错误，请重试", "error")
      }
    } else {
      showToast("修改失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Change password error:", error)
    showToast("修改失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

async function confirmDeleteAccount() {
  if (!confirm("确定要删除您的账户吗？此操作不可撤销。")) return

  const password = prompt("请输入您的密码以确认删除账户")
  if (!password) {
    showToast("请输入密码以确认删除", "warning")
    return
  }

  showLoading("正在删除账户...")

  try {
    const formData = new FormData()
    formData.append("userId", currentUser.userId)
    formData.append("password", password)

    const response = await fetch("/user/deleteAccount", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      if (result > 0) {
        showToast("账户已成功删除", "success")
        logout()
      } else {
        showToast("密码错误，删除账户失败", "error")
      }
    } else {
      showToast("删除失败，请检查网络连接", "error")
    }
  } catch (error) {
    console.error("Delete account error:", error)
    showToast("删除失败，请稍后重试", "error")
  } finally {
    hideLoading()
  }
}

/* 工具函数 */
function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

function handleGlobalSearch(event) {
  const searchTerm = event.target.value.toLowerCase()

  // 搜索文件
  const fileItems = document.querySelectorAll(".file-item")
  fileItems.forEach((item) => {
    const fileName = item.querySelector("h4").textContent.toLowerCase()
    if (fileName.includes(searchTerm)) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })

  // 搜索照片
  const photoItems = document.querySelectorAll(".photo-item")
  photoItems.forEach((item) => {
    const photoName = item.querySelector("h4").textContent.toLowerCase()
    if (photoName.includes(searchTerm)) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })

  // 搜索待办事项
  const todoItems = document.querySelectorAll(".todo-item")
  todoItems.forEach((item) => {
    const todoText = item.querySelector(".todo-text").textContent.toLowerCase()
    if (todoText.includes(searchTerm)) {
      item.style.display = "flex"
    } else {
      item.style.display = "none"
    }
  })
}

function handleKeyboardShortcuts(event) {
  // Ctrl+K 聚焦搜索框
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault()
    elements.globalSearch.focus()
  }

  // Esc 退出搜索框
  if (document.activeElement === elements.globalSearch && event.key === "Escape") {
    elements.globalSearch.blur()
  }
}

function sortItemsByTime(items, timeKey) {
  return items.sort((a, b) => new Date(b[timeKey]) - new Date(a[timeKey]))
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
