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
  current: SemVerString;
  wanted: SemVerString;
  latest: SemVerString;
};

export const summarize = <T extends OutdatedJson>(obj: T): Summary => {
  const entries = Object.entries(obj);

  const packages = entries.map<SummaryPackage>(([packageName, entry]) => {
    return {
      name: packageName,
      type: entry.type,
      current: entry.current,
      wanted: entry.wanted,
      latest: entry.latest,
    };
  });

  return {
    packages,
  };
};

export const format = (summary: Summary): string => {
  const typeMap = new Map<string, SummaryPackage[]>();

  for (const pkg of summary.packages) {
    const pkgs = typeMap.get(pkg.type) ?? [];
    pkgs.push(pkg);
    typeMap.set(pkg.type, pkgs);
  }

  const out: string[] = [];

  for (const [typeName, pkgs] of typeMap.entries()) {
    out.push(`[${typeName}]\n`);

    for (const pkg of pkgs) {
      out.push(`  ${pkg.name}\n`);
      out.push(`    ${pkg.current} -> ${pkg.wanted}`);

      if (pkg.wanted != pkg.latest) {
        out.push(` (${pkg.latest})`);
      }

      out.push(`\n`);
    }
  }

  return out.join("");
};
