#!/usr/bin/env bash

set -eu

mission_dir="${MISSION_ROOT:-${HOME}/terminal-mission}"

if [ -e "$mission_dir" ]; then
  echo "Mission not created: $mission_dir already exists."
  echo "Rename or remove that folder if you want to start again."
  exit 1
fi

mkdir -p \
  "$mission_dir/headquarters" \
  "$mission_dir/evidence/archive" \
  "$mission_dir/logs" \
  "$mission_dir/vault"

printf '%s\n' \
  'MOON BASE 36 — INCIDENT REPORT' \
  '' \
  'Agent NOVA has stolen the launch code.' \
  'Your first orders are hidden somewhere inside headquarters.' \
  'Use the terminal, document your commands, and trust no unknown script.' \
  > "$mission_dir/README.txt"

printf '%s\n' \
  'LEVEL 1 COMPLETE' \
  'The intruder hid a clue in the only evidence file that is exactly 1337 bytes.' \
  'Search the entire evidence directory.' \
  > "$mission_dir/headquarters/.briefing"

printf '%s\n' 'Routine telemetry. Nothing to report.' \
  > "$mission_dir/evidence/telemetry.txt"
printf '%s\n' 'A suspicious filename, but only a decoy.' \
  > "$mission_dir/evidence/archive/definitely-not-the-clue.txt"
printf '%s\n' 'Remember to quote filenames containing spaces.' \
  > "$mission_dir/evidence/archive/old field report.txt"

clue='LEVEL 2 COMPLETE - Search logs/access.log for DENIED requests. Identify the busiest hostile IP and every username it tried.'
printf '%-1336s\n' "$clue" > "$mission_dir/evidence/packet-36.dat"

printf '%s\n' \
  '2026-09-02T08:00:01Z status=OK user=anna ip=10.0.0.15' \
  '2026-09-02T08:02:17Z status=DENIED user=root ip=203.0.113.42' \
  '2026-09-02T08:04:09Z status=OK user=malik ip=10.0.0.21' \
  '2026-09-02T08:05:31Z status=DENIED user=admin ip=203.0.113.42' \
  '2026-09-02T08:07:44Z status=DENIED user=test ip=198.51.100.8' \
  '2026-09-02T08:09:02Z status=OK user=anna ip=10.0.0.15' \
  '2026-09-02T08:11:26Z status=DENIED user=backup ip=203.0.113.42' \
  '2026-09-02T08:12:55Z status=OK user=malik ip=10.0.0.21' \
  '2026-09-02T08:15:10Z status=DENIED user=guest ip=203.0.113.42' \
  '2026-09-02T08:18:33Z status=DENIED user=oracle ip=192.0.2.99' \
  '2026-09-02T08:21:48Z status=OK user=anna ip=10.0.0.15' \
  > "$mission_dir/logs/access.log"

printf '%s\n' \
  'FLAG{ubuntu_terminal_agent}' \
  'LEVEL 4 COMPLETE — Verify this file with the supplied SHA-256 checksum.' \
  > "$mission_dir/vault/launch-code.txt"

(
  cd "$mission_dir"
  sha256sum vault/launch-code.txt > launch-code.sha256
)

chmod 000 "$mission_dir/vault/launch-code.txt"

echo "Moon Base 36 created at $mission_dir"
echo "Enter it with: cd $mission_dir"
