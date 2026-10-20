import type { ComponentType } from "react";
import { ConsensusEmblem } from "@/components/emblems/ConsensusEmblem";
import { DiveEmblem } from "@/components/emblems/DiveEmblem";
import { IcsEmblem } from "@/components/emblems/IcsEmblem";
import { PsnEmblem } from "@/components/emblems/PsnEmblem";
import { SsalEmblem } from "@/components/emblems/SsalEmblem";
import type { EmblemId } from "@/types";

const EMBLEMS: Record<EmblemId, ComponentType<{ className?: string }>> = {
  ics: IcsEmblem,
  psn: PsnEmblem,
  dive: DiveEmblem,
  consensus: ConsensusEmblem,
  ssal: SsalEmblem,
};

export function Emblem({ id, className = "block h-full w-full" }: { id: EmblemId; className?: string }) {
  const Drawing = EMBLEMS[id];
  return <Drawing className={className} />;
}
