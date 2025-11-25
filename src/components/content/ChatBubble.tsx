import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '@/constants/theme';

interface ChatBubbleProps {
  message: string;
  sender: 'friend' | 'self' | 'other';
  senderName?: string;
  showTail?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  senderName,
  showTail = true
}) => {
  // 'self' messages go to the right, 'friend' and 'other' go to the left
  const isRight = sender === 'self';

  const getBubbleColor = () => {
    switch (sender) {
      case 'self':
        return colors.primary;
      case 'friend':
        return '#E8E8E8';
      case 'other':
        return '#DCF8C6';
      default:
        return '#E8E8E8';
    }
  };

  const getTextColor = () => {
    return sender === 'self' ? colors.white : colors.text;
  };

  return (
    <View style={[styles.container, isRight ? styles.rightAlign : styles.leftAlign]}>
      {senderName && (
        <Text style={[styles.senderName, isRight ? styles.rightName : styles.leftName]}>
          {senderName}
        </Text>
      )}
      <View
        style={[
          styles.bubble,
          { backgroundColor: getBubbleColor() },
          isRight ? styles.rightBubble : styles.leftBubble,
          showTail && (isRight ? styles.rightTail : styles.leftTail),
        ]}
      >
        <Text style={[styles.messageText, { color: getTextColor() }]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    maxWidth: '80%',
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  rightAlign: {
    alignSelf: 'flex-end',
  },
  senderName: {
    fontSize: 12,
    color: colors.graySoft,
    marginBottom: 4,
  },
  leftName: {
    marginLeft: spacing.sm,
  },
  rightName: {
    marginRight: spacing.sm,
    textAlign: 'right',
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.lg + 2,
    minWidth: 60,
  },
  leftBubble: {
    borderTopLeftRadius: radii.xs,
  },
  rightBubble: {
    borderTopRightRadius: radii.xs,
  },
  leftTail: {
    borderBottomLeftRadius: radii.lg + 2,
  },
  rightTail: {
    borderBottomRightRadius: radii.lg + 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default ChatBubble;
