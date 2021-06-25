namespace ModelViewerEditor.Helpers
{
    public static class StringExtensions
    {

        public static bool IsNullOrWhitespace(this string s)
        {
            return string.IsNullOrWhiteSpace(s);
        }
        public static bool IsObjectId(this string s)
        {
            return s is {Length: 24} && TryParseHexString(s, out _);
        }
        
        private static bool TryParseHexString(string s, out byte[] bytes)
        {
            bytes = null;

            if (s == null)
            {
                return false;
            }

            var buffer = new byte[(s.Length + 1) / 2];

            var i = 0;
            var j = 0;

            if ((s.Length % 2) == 1)
            {
                // if s has an odd length assume an implied leading "0"
                if (!TryParseHexChar(s[i++], out var y))
                {
                    return false;
                }
                buffer[j++] = (byte)y;
            }

            while (i < s.Length)
            {
                if (!TryParseHexChar(s[i++], out var x))
                {
                    return false;
                }
                if (!TryParseHexChar(s[i++], out var y))
                {
                    return false;
                }
                buffer[j++] = (byte)((x << 4) | y);
            }

            bytes = buffer;
            return true;
        }

        private static bool TryParseHexChar(char c, out int value)
        {
            switch (c)
            {
                case >= '0' and <= '9':
                    value = c - '0';
                    return true;
                case >= 'a' and <= 'f':
                    value = 10 + (c - 'a');
                    return true;
                case >= 'A' and <= 'F':
                    value = 10 + (c - 'A');
                    return true;
                default:
                    value = 0;
                    return false;
            }
        }
    }
}