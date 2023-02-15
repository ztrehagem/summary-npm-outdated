type SemVerString = string;
type DependencyTypeString = string;
type URLString = string;

export type OutdatedJson = Record<string, OutdatedJsonEntry>;

export type OutdatedJsonEntry = {
  current: SemVerString;
  wanted: SemVerString;
  latest: SemVerString;
  dependent: string;
  location: string;
  type: DependencyTypeString;
  homepage: URLString;
};

export type Summary = {
  packages: SummaryPackage[];
};

export type SummaryPackage = {
  name: string;
  type: DependencyTypeString;
};

export const summarize = <T extends OutdatedJson>(obj: T): Summary => {
  const entries = Object.entries(obj);

  const packages = entries.map<SummaryPackage>(([packageName, entry]) => {
    return {
      name: packageName,
      type: entry.type,
    };
  });

  return {
    packages,
  };
};
