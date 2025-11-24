
# Bantrab LevelUp – UI Style Guide 🎮📱

Guía visual para la app de **gamificación financiera tipo Duolingo** de Bantrab.  
El objetivo es que **diseño, negocio y desarrollo** usen el mismo lenguaje visual.

---

## 📌 Índice

1. [Propósito y Alcance](#-propósito-y-alcance)
2. [Paleta de Colores](#-paleta-de-colores)
   - [Colores principales](#colores-principales)
   - [Colores de apoyo](#colores-de-apoyo)
   - [Ejemplos de combinación](#ejemplos-de-combinación)
3. [Tipografía](#-tipografía)
4. [Componentes de UI](#-componentes-de-ui)
   - [Botones](#botones)
   - [Tarjetas de misiones](#tarjetas-de-misiones)
   - [Badges / Recompensas](#badges--recompensas)
   - [Roadmap de niveles](#roadmap-de-niveles)
5. [Uso de Marca e Imágenes](#-uso-de-marca-e-imágenes)
6. [Implementación en Código (React Native + Expo)](#-implementación-en-código-react-native--expo)
   - [Tokens de tema (`theme.ts`)](#tokens-de-tema-themets)
   - [Ejemplos de uso en componentes](#ejemplos-de-uso-en-componentes)

---

## 🎯 Propósito y Alcance

Esta línea gráfica define:

- **Colores** oficiales y de apoyo para la app Bantrab LevelUp.
- **Jerarquía tipográfica** para títulos, subtítulos, cuerpo de texto y etiquetas.
- **Patrones visuales** para componentes clave (botones, tarjetas, badges, roadmap).
- **Directrices de marca**, uso de logo e imágenes.
- **Tokens de diseño** listos para usar en código (React Native + Expo).

Todo lo que se diseñe o desarrolle para **LevelUp** debe seguir este documento.

---

## 🎨 Paleta de Colores

> Base: colores oficiales de Bantrab + neutros para interfaz.

### Colores principales

- `#00b5b0` – **Teal Bantrab (Primario)**
  - Uso: fondos principales, encabezados, contenedores grandes, elementos de progreso.
- `#e3046e` – **Magenta Bantrab (Acción / Gamificación)**
  - Uso: botones principales, badges, estados de “reto completado”, CTAs importantes.
- `#ffdf00` – **Amarillo Bantrab (Resaltado / Recompensas)**
  - Uso: estrellas, monedas, niveles, tooltips positivos, banners de recompensa.

### Colores de apoyo

- `#a1abb4` – **Gris azulado (Texto secundario / bordes suaves)**
  - Uso: subtítulos, placeholders, divisores, bordes de tarjetas.
- `#262626` – **Texto principal**
  - Uso: títulos, descripciones importantes, texto sobre fondos claros.
- `#ffffff` – **Blanco**
  - Uso: tarjetas, fondos de componentes, contraste sobre teal.
- `#f4f4f4` – **Gris claro de fondo**
  - Uso: fondos de pantalla, secciones, estados deshabilitados suaves.

### Ejemplos de combinación

**Pantalla típica con tarjeta y botón**

- Fondo de pantalla: `#f4f4f4`
- Tarjeta principal:
  - Fondo: `#ffffff`
  - Borde: `#a1abb4` con opacidad baja
- Botón primario:
  - Fondo: `#00b5b0`
  - Texto: `#ffffff`
  - Icono de nivel: `#ffdf00`

**Roadmap de niveles**

- Nodos completados:
  - Círculo: `#00b5b0`
  - Borde: `#ffdf00`
  - Check: `#ffffff`
- Nodo actual:
  - Fondo: `#e3046e`
  - Texto/Icono: `#ffffff`
- Nodos bloqueados:
  - Borde: `#a1abb4`
  - Fondo: `#ffffff`
  - Texto: `#a1abb4`

---

## 🔤 Tipografía

Si no se especifica otra fuente corporativa:

- **Titulares / Niveles / Puntos**: `Poppins` o `Nunito`.
- **Cuerpo de texto**: fuente del sistema (iOS/Android) con tamaños y pesos controlados.

### Jerarquía tipográfica sugerida

- **H1 – Pantallas principales**
  - 24–28 px, `bold`
  - Color: `#262626` o `#ffffff` sobre fondo teal
- **H2 – Secciones**
  - 20–22 px, `600` / `semibold`
- **H3 / Labels**
  - 16 px, `semibold`
- **Body**
  - 14–16 px, `regular`
  - Color por defecto: `#262626`
- **Texto secundario / hints**
  - 12–13 px, `regular`
  - Color: `#a1abb4`

---

## 🧩 Componentes de UI

### Botones

**Primario (acción importante)**

- Fondo: `#00b5b0`
- Texto: `#ffffff`
- Border radius: `999` (pill)
- Sombra suave para sensación de “tap”.

**Secundario (acción alternativa)**

- Fondo: `#ffffff`
- Borde: `#00b5b0`
- Texto: `#00b5b0`

**Terciario / Fantasma**

- Fondo: transparente
- Texto: `#262626` o `#a1abb4`
- Uso: enlaces secundarios, acciones menos frecuentes.

---

### Tarjetas de misiones

Usadas en el **roadmap** y en la **lista de actividades**.

- Fondo: `#ffffff`
- Borde: `#f4f4f4` o sombra suave
- Título de misión:
  - Color: `#262626`
- Progreso (porcentaje / XP):
  - Énfasis visual con `#e3046e` o `#ffdf00`
- Chip de categoría (Ej. “Ahorro”, “Crédito responsable”):
  - Fondo: `#00b5b0` o `#e3046e` según categoría
  - Texto: `#ffffff`

---

### Badges / Recompensas

- Formas simples: círculo, estrella, medalla.
- Colores predominantes:
  - `#ffdf00` (recompensas)
  - `#e3046e` (logros especiales)
  - `#ffffff` como contraste.

**Niveles de badge:**

- 🥉 Bronce: Se combina `#a1abb4` con detalles claros.
- 🥈 Plata: Más blanco + gris, menos saturado.
- 🥇 Oro: Énfasis en `#ffdf00` + detalles en `#00b5b0`.

---

### Roadmap de niveles

Elemento central de la app (tipo Duolingo).

- Fondo:
  - Degradado suave desde `#00b5b0` a un teal más claro o `#f4f4f4`.
- Nodos:
  - Tamaño: 56–72 px de diámetro.
  - Icono dentro del nodo (ej. alcancía, tarjeta, meta de viaje).
- Conexiones:
  - Estado bloqueado: línea `#a1abb4`
  - Estado desbloqueado / completado: línea `#00b5b0`

---

## 🏦 Uso de Marca e Imágenes

### Logo Bantrab

- Siempre sobre fondo **limpio**:
  - `#ffffff` o `#00b5b0`
- Usar el símbolo completo según lineamientos de marca.

### Submarca LevelUp

- Puede incluirse como:
  - Texto “**LevelUp**” en `#e3046e` junto al símbolo de Bantrab.
- Iconografía:
  - Figuras humanas simples.
  - Colores vibrantes.
  - Fondos limpios, sin saturación.

### Imágenes y banners

- Máximo **2 colores fuertes** + 1 neutro por pieza.
- Estilo fotográfico alineado a Bantrab:
  - Personas jóvenes, agentes, escenas de vida real.
- En la app:
  - Imágenes con bordes redondeados (8–16 px).

---

## 🧪 Implementación en Código (React Native + Expo)

Toda la línea gráfica debe centralizarse en un archivo de tema, por ejemplo:

`constants/theme.ts`

### Tokens de tema (`theme.ts`)

```ts
// constants/theme.ts

export const colors = {
  primary: '#00b5b0',
  accentMagenta: '#e3046e',
  accentYellow: '#ffdf00',
  graySoft: '#a1abb4',
  text: '#262626',
  white: '#ffffff',
  background: '#f4f4f4',
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
  },
};
```

### Ejemplos de uso en componentes

**Botón primario:**

```tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

export function PrimaryButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    color: colors.white,
  },
});
```

**Tarjeta de misión:**

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';

export function MissionCard({ title, xp, category }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.xp}>{xp} XP</Text>
      <View style={styles.chip}>
        <Text style={styles.chipText}>{category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...typography.subtitle,
  },
  xp: {
    ...typography.body,
    color: colors.accentMagenta,
    marginTop: spacing.xs,
  },
  chip: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chipText: {
    ...typography.body,
    fontSize: 12,
    color: colors.white,
  },
});
```

---

> **Nota para el equipo:**  
> Cualquier nuevo componente o pantalla debe reutilizar estos **tokens** y **patrones** antes de agregar estilos nuevos.  
> Si algo no encaja en esta guía, se propone primero en diseño (Figma) y luego se actualiza este README.
