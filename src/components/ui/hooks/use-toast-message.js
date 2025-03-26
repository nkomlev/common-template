import { useToast } from "@/components/ui/hooks/use-toast";

export function useMessage() {
  const { toast } = useToast();

  function showError({ title, description, action }) {
    let tObject = {
      variant: "destructive",
      title,
      description,
    };

    toast(tObject);
  }

  function showApprove({ title, description, action }) {
    let tObject = {
      variant: "approved",
      title,
      description,
    };

    toast(tObject);
  }

  function showInfo({ title, description, action }) {
    let tObject = {
      title,
      description,
    };
    toast(tObject);
  }

  return { showError, showInfo, showApprove };
}