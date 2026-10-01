import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  /* ================= CONTAINERS ================= */

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    height: 90,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingTop:30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  /* ================= TEXT ================= */

  text: {
    fontSize: 15,
    color: colors.textPrimary,
  },

  smallText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },

  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  boldText: {
    fontWeight: "700",
    color: colors.textPrimary,
  },

  /* ================= ROWS ================= */

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= CARDS ================= */

  card: {
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: colors.white,
  },

  outlinedCard: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    backgroundColor: colors.white,
  },

  summaryCard: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
  },

  /* ================= INPUTS ================= */

  input: {
    height: 52,
    width: "100%",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },

  /* ================= BUTTONS ================= */

  button: {
    height: 56,
    width:"100%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },

  smallButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: "#E8EEFF",
  },

  /* ================= COMMON ICON BUTTON ================= */

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  /* ================= DETAIL ROW ================= */

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  detailLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },

  detailValue: {
    flex: 1.25,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "right",
    color: colors.textSecondary,
  },

  /* ================= TOTAL ================= */

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  totalAmount: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  /* ================= DIVIDER ================= */

  divider: {
    height: 1,
    marginVertical: 15,
    backgroundColor: colors.borderLight,
  },

  /* ================= EMPTY STATE ================= */

  empty: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.textSecondary,
  },

  /* ================= COMMON CARD ROW ================= */

  horizontalCard: {
    flexDirection: "row",
  },

  /* ================= SPACING ================= */

  mt10: {
    marginTop: 10,
  },

  mt20: {
    marginTop: 20,
  },

  mb10: {
    marginBottom: 10,
  },

  mb20: {
    marginBottom: 20,
  },

  ml10: {
    marginLeft: 10,
  },

  mr10: {
    marginRight: 10,
  },

  /* ================= IMAGE ================= */

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  /* ================= STATUS ================= */

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  successText: {
    color: colors.success,
    fontWeight: "600",
  },

  errorText: {
    color: colors.error,
    fontWeight: "600",
  },
});