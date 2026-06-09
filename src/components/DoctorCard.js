import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const DoctorCard = ({ doctor, onPress }) => {
  const getInitials = (name) => {
    if (!name) return 'DR';
    return name
      .replace('Dr. ', '')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{getInitials(doctor.name)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.nameText}>{doctor.name}</Text>
          {doctor.availableToday && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Available Today</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.specialityText}>{doctor.speciality}</Text>
        <Text style={styles.hospitalText}>{doctor.hospital}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.statValue}>{doctor.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.statText}>{doctor.experience} yrs exp</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.feeText}>₹{doctor.fee}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    flexShrink: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065f46',
  },
  specialityText: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
    fontWeight: '500',
  },
  hospitalText: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  divider: {
    fontSize: 13,
    color: '#cbd5e1',
    marginHorizontal: 8,
  },
  statText: {
    fontSize: 13,
    color: '#64748b',
  },
  feeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e3a8a',
  },
});

export default DoctorCard;
