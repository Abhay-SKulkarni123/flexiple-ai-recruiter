import type { CandidateProfile } from "../schemas/profile.js";
import type { ObjectiveFilters } from "../schemas/search.js";

const normalize = (value: string): string => value.trim().toLowerCase();

function matchesExperience(
  years: number,
  bounds: ObjectiveFilters["experience"]
): boolean {
  if (!bounds) return true;
  const { min, max } = bounds;
  if (min !== null && years < min) return false;
  if (max !== null && years > max) return false;
  return true;
}

function matchesLocations(
  profileLocation: string,
  locations: string[]
): boolean {
  if (locations.length === 0) return true;
  const target = normalize(profileLocation);
  return locations.some((loc) => normalize(loc) === target);
}

function matchesSkills(
  profileSkills: string[],
  requiredSkills: string[]
): boolean {
  if (requiredSkills.length === 0) return true;
  const normalizedProfileSkills = profileSkills.map(normalize);
  return requiredSkills.every((skill) => {
    const wanted = normalize(skill);
    return normalizedProfileSkills.some((profileSkill) => profileSkill.includes(wanted));
  });
}

function matchesCompanyTypes(
  profile: CandidateProfile,
  companyTypes: string[]
): boolean {
  if (companyTypes.length === 0) return true;
  const wanted = new Set(companyTypes.map(normalize));
  if (wanted.has(normalize(profile.current_company_type))) return true;
  return profile.past_companies.some((entry) =>
    wanted.has(normalize(entry.company_type))
  );
}

export function filterProfiles(
  profiles: CandidateProfile[],
  filters: ObjectiveFilters
): CandidateProfile[] {
  return profiles.filter(
    (profile) =>
      matchesExperience(profile.years_experience, filters.experience) &&
      matchesLocations(profile.location, filters.locations) &&
      matchesSkills(profile.skills, filters.skills) &&
      matchesCompanyTypes(profile, filters.companyTypes)
  );
}