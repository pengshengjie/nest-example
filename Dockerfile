# 使用官方的Node.js镜像作为基础镜像
FROM node:14

# 设置容器内的工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到容器内以安装依赖
COPY package*.json ./

# 安装项目依赖
RUN npm ci

# 将项目源代码复制到容器内
COPY . .

# 设置环境变量（如有需要）
# ENV NODE_ENV=production

# 构建NestJS应用
RUN npm run build

# 指定启动命令
CMD ["npm", "start"]