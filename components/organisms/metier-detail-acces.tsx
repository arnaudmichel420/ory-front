import { MetierDetailSection } from "@/components/organisms/metier-detail-section";
import { Text } from "@/components/ui/text";
import { type MetierDetail } from "@/types/metier";
import { BookOpenIcon } from "lucide-react-native";

type MetierDetailAccesProps = {
  metier: MetierDetail;
};

function MetierDetailAcces({ metier }: MetierDetailAccesProps) {
  if (!metier.accesMetier) {
    return null;
  }

  return (
    <MetierDetailSection title="Acces au metier" icon={BookOpenIcon}>
      <Text className="leading-7 text-foreground">{metier.accesMetier}</Text>
    </MetierDetailSection>
  );
}

export { MetierDetailAcces };
