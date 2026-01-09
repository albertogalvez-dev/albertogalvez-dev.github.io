# 🚀 Deploy: Portfolio en Oracle Linux + Nginx

Esta guía explica cómo desplegar el portfolio (Next.js export estático) en un servidor Oracle Linux con Nginx.

## Variables

Antes de empezar, define estas variables:

```powershell
# Windows PowerShell
$KEY_PATH = "C:\ruta\a\tu\oracle_key.key"
$SERVER_IP = "TU_IP_PUBLICA"
$PROJECT_DIR = "C:\ruta\al\proyecto"
```

---

## 1. Build Local (Windows)

```powershell
cd $PROJECT_DIR
npm ci
npm run build

# Verificar
Test-Path ".\out\index.html"
```

---

## 2. Upload (Windows → Servidor)

```powershell
# Crear carpeta destino
ssh -i $KEY_PATH opc@$SERVER_IP "mkdir -p /home/opc/portfolio_out"

# Subir
scp -i $KEY_PATH -r "$PROJECT_DIR\out\*" "opc@${SERVER_IP}:/home/opc/portfolio_out/"
```

---

## 3. Instalación (Linux)

```bash
# Crear directorios
sudo mkdir -p /var/www/portfolio /var/www/wms /var/www/helpdesk

# Copiar portfolio
sudo cp -r /home/opc/portfolio_out/* /var/www/portfolio/

# Permisos
sudo chown -R nginx:nginx /var/www/portfolio /var/www/wms /var/www/helpdesk
sudo find /var/www/portfolio -type d -exec chmod 755 {} \;
sudo find /var/www/portfolio -type f -exec chmod 644 {} \;

# SELinux
sudo restorecon -Rv /var/www/portfolio /var/www/wms /var/www/helpdesk
```

---

## 4. Placeholders

Copia los archivos de `deploy/placeholders/` al servidor:

```bash
# Desde el repo local
scp -i $KEY_PATH "deploy\placeholders\wms\index.html" "opc@${SERVER_IP}:/home/opc/"
ssh -i $KEY_PATH opc@$SERVER_IP "sudo mv /home/opc/index.html /var/www/wms/"

scp -i $KEY_PATH "deploy\placeholders\helpdesk\index.html" "opc@${SERVER_IP}:/home/opc/"
ssh -i $KEY_PATH opc@$SERVER_IP "sudo mv /home/opc/index.html /var/www/helpdesk/"

# Permisos
ssh -i $KEY_PATH opc@$SERVER_IP "sudo chown nginx:nginx /var/www/wms/index.html /var/www/helpdesk/index.html && sudo chmod 644 /var/www/wms/index.html /var/www/helpdesk/index.html"
```

---

## 5. Nginx Config

Copia `deploy/nginx/portfolio.conf` al servidor:

```bash
scp -i $KEY_PATH "deploy\nginx\portfolio.conf" "opc@${SERVER_IP}:/home/opc/"
ssh -i $KEY_PATH opc@$SERVER_IP "sudo mv /home/opc/portfolio.conf /etc/nginx/conf.d/"
```

Desactivar configs por defecto:

```bash
ssh -i $KEY_PATH opc@$SERVER_IP "sudo mv /etc/nginx/conf.d/welcome.conf /etc/nginx/conf.d/welcome.conf.off 2>/dev/null; sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.off 2>/dev/null"
```

Validar y recargar:

```bash
ssh -i $KEY_PATH opc@$SERVER_IP "sudo nginx -t && sudo systemctl reload nginx"
```

---

## 6. Verificación

```bash
curl -I http://TU_IP/              # 200 - Portfolio
curl -I http://TU_IP/projects/wms  # 200 - Detalle proyecto
curl -I http://TU_IP/wms/          # 200 - Placeholder
curl -I http://TU_IP/helpdesk/     # 200 - Placeholder
```

---

## Troubleshooting

### Oracle Test Page aparece
```bash
sudo nginx -T | grep -n "default_server"
sudo mv /etc/nginx/conf.d/welcome.conf /etc/nginx/conf.d/welcome.conf.off
sudo systemctl reload nginx
```

### Error 403
```bash
ls -laZ /var/www/portfolio/index.html
sudo restorecon -Rv /var/www
```

### Error 404 en /projects/slug
```bash
ls /var/www/portfolio/projects/
# Debe existir wms.html, helpdesk.html, etc.
```
